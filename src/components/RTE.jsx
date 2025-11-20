import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-3 text-sm font-medium text-cyan-300 drop-shadow-[0_0_6px_#00eaff]">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <div
            className="
              rounded-lg overflow-hidden
              border border-cyan-700
              bg-[#061922]
              shadow-[0_0_12px_#00eaff55]
              transition-all duration-300
              hover:shadow-[0_0_20px_#00eaffaa]
              focus-within:border-cyan-400
              focus-within:shadow-[0_0_25px_#00eaff]
            "
          >
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              initialValue={defaultValue}
              onEditorChange={onChange}
              init={{
                height: 450,
                menubar: true,

                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                  "emoticons",
                ],

                toolbar:
                  "undo redo | bold italic forecolor backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | link image media | code fullscreen",

                content_style: `
                    body {
                        font-family: 'Inter', sans-serif;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #d4f5ff;
                        background-color: #061922;
                    }

                    ::selection {
                        background: #00eaff55;
                    }

                    /* Headings with Glow */
                    h1, h2, h3, h4 {
                        color: #00eaff;
                        text-shadow: 0 0 10px #00eaff;
                    }

                    /* Neon borders for tables */
                    table, th, td {
                        border-color: #00eaff66 !important;
                    }

                    /* Images */
                    img {
                        border-radius: 8px;
                        box-shadow: 0 0 12px #00eaff44;
                    }

                    /* Scrollbar */
                    ::-webkit-scrollbar {
                        width: 10px;
                    }
                    ::-webkit-scrollbar-track {
                        background: #041018;
                    }
                    ::-webkit-scrollbar-thumb {
                        background: #00eaff88;
                        border-radius: 10px;
                    }
                `,

                skin: "oxide-dark",
                content_css: "dark",

                branding: false,
                promotion: false,
                toolbar_mode: "sliding",

                link_default_target: "_blank",
                image_advtab: true,
                image_caption: true,

                // Responsive Images
                image_class_list: [
                  { title: "Responsive", value: "w-full" },
                  { title: "Rounded", value: "rounded-lg" },
                ],
              }}
            />
          </div>
        )}
      />
    </div>
  );
}

