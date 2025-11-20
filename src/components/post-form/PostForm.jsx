import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (post?.featuredImage) {
            try {
                setImagePreview(appwriteService.getFileView(post.featuredImage));
            } catch {}
        }
    }, [post]);

    const submit = async (data) => {
        setIsSubmitting(true);
        try {
            if (post) {
                const file = data.image?.[0]
                    ? await appwriteService.uploadFile(data.image[0])
                    : null;

                if (file?.$id) await appwriteService.deleteFile(post.featuredImage);

                const { image, ...updateData } = data;

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...updateData,
                    featuredImage: file?.$id || post.featuredImage,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                if (!data.image?.[0]) {
                    setIsSubmitting(false);
                    return alert("Please select an image");
                }

                let userId = userData?.$id;
                if (!userId) {
                    const user = await authService.getCurrentUser();
                    if (!user?.$id) return navigate("/login");
                    userId = user.$id;
                }

                const file = await appwriteService.uploadFile(data.image[0]);
                if (!file?.$id) return;

                const { image, ...postData } = data;

                const dbPost = await appwriteService.createPost({
                    ...postData,
                    featuredImage: file.$id,
                    userId,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error(error);
        }
        setIsSubmitting(false);
    };

    const slugTransform = useCallback((value) => {
        return (
            value
                ?.trim()
                ?.toLowerCase()
                ?.replace(/[^a-zA-Z\d\s]+/g, "-")
                ?.replace(/\s+/g, "-") || ""
        );
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const sub = watch((value, { name }) => {
            if (name === "title") setValue("slug", slugTransform(value.title));
        });
        return () => sub.unsubscribe();
    }, [watch]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col lg:flex-row gap-8 p-6 bg-[#05070d] text-cyan-300
                       border border-cyan-800 rounded-2xl 
                       shadow-[0_0_30px_#00eaff55] animate-fadeIn"
        >
            {/* LEFT SIDE */}
            <div className="w-full lg:w-2/3 space-y-6">
                {/* Title */}
                <div className="transition hover:translate-x-1">
                    <Input
                        label="Title :"
                        placeholder="Enter title"
                        className="bg-[#0b0f18] text-cyan-300 border-cyan-700"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                        <p className="text-red-400 text-sm animate-shake">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Slug */}
                <div className="transition hover:translate-x-1">
                    <Input
                        label="Slug :"
                        placeholder="post-slug"
                        className="bg-[#0b0f18] text-cyan-300 border-cyan-700"
                        {...register("slug", { required: "Slug is required" })}
                        onInput={(e) =>
                            setValue("slug", slugTransform(e.target.value))
                        }
                    />
                    {errors.slug && (
                        <p className="text-red-400 text-sm animate-shake">
                            {errors.slug.message}
                        </p>
                    )}
                </div>

                {/* CONTENT */}
                <div className="rounded-xl border border-cyan-800 bg-[#090d14] 
                                shadow-[0_0_20px_#00eaff33] p-2">
                    <RTE
                        label="Content :"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/3 space-y-6">
                {/* IMAGE CARD */}
                <div className="p-6 rounded-xl bg-[#080b13] border border-cyan-800 
                                shadow-[0_0_20px_#00eaff44]">
                    <h3 className="text-cyan-400 font-semibold mb-4 flex items-center gap-2">
                        <span className="w-3 h-3 bg-cyan-400 rounded-full 
                                         shadow-[0_0_10px_#00eaff]"></span>
                        Featured Image
                    </h3>

                    <Input
                        type="file"
                        accept="image/*"
                        className="bg-[#0b0f18] border-cyan-700 text-cyan-200"
                        {...register("image", { required: !post })}
                        onChange={(e) => {
                            register("image").onChange(e);
                            handleImageChange(e);
                        }}
                    />

                    {imagePreview && (
                        <div className="mt-4 rounded-xl overflow-hidden 
                                        shadow-[0_0_20px_#00eaff44]">
                            <img
                                src={imagePreview}
                                className="w-full h-48 object-cover border border-cyan-700 
                                           hover:scale-105 transition"
                            />
                        </div>
                    )}
                </div>

                {/* STATUS + SUBMIT */}
                <div className="p-6 rounded-xl bg-[#080b13] border border-cyan-800 
                                shadow-[0_0_20px_#00eaff44]">
                    <h3 className="text-cyan-400 font-semibold mb-4 flex items-center gap-2">
                        <span className="w-3 h-3 bg-cyan-400 rounded-full 
                                         shadow-[0_0_10px_#00eaff]"></span>
                        Publish Settings
                    </h3>

                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="text-cyan-200 bg-[#0b0f18] border-cyan-700"
                        {...register("status", { required: true })}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 w-full bg-cyan-500 hover:bg-cyan-400 
                                   text-black font-bold 
                                   shadow-[0_0_15px_#00eaff] 
                                   hover:shadow-[0_0_25px_#00eaff] transition-all"
                    >
                        {isSubmitting
                            ? "Loading..."
                            : post
                            ? "Update Post"
                            : "Publish Post"}
                    </Button>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeIn { 
                  from { opacity: 0 } 
                  to { opacity: 1 } 
                }
                @keyframes shake {
                  0%,100% { transform: translateX(0); }
                  25% { transform: translateX(-5px); }
                  75% { transform: translateX(5px); }
                }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
                .animate-shake { animation: shake 0.3s ease-in-out; }
            `}</style>
        </form>
    );
}
