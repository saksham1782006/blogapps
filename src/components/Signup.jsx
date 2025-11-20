import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const create = async (data) => {
    setError("")
    setIsLoading(true)

    try {
      const session = await authService.createAccount(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(login(userData))
        navigate("/")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#02070A] px-4 relative">

      {/* CYBER NEON BLOBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* SIGNUP CONTAINER */}
      <div className="relative w-full max-w-md bg-[#030E14] p-8 rounded-2xl border border-cyan-700 shadow-[0_0_25px_#00eaff55] animate-fadeIn">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div className="w-28 transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_12px_#00eaff]">
            <Logo width="100%" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-center text-3xl font-bold text-cyan-300 drop-shadow-[0_0_6px_#00eaff]">
          Create Your Account
        </h2>

        <p className="mt-2 text-center text-sm text-cyan-200/70">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-300 hover:text-cyan-400 transition-all hover:underline"
          >
            Sign In →
          </Link>
        </p>

        {/* ERROR BOX */}
        {error && (
          <div className="mt-5 text-red-400 text-center bg-red-950/40 border border-red-600 rounded-lg p-3 animate-shake">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">

          {/* FULL NAME */}
          <div>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              className="gamer-input"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 animate-shake">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              className="gamer-input"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 animate-shake">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="gamer-input"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 animate-shake">{errors.password.message}</p>
            )}
            <p className="text-xs text-cyan-200/50 mt-1">Must be at least 8 characters</p>
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            disabled={isLoading}
            className="
              w-full px-6 py-3 rounded-xl font-semibold
              bg-[#04141F] text-cyan-300 border border-cyan-600
              shadow-[0_0_15px_#00eaff55] 
              hover:shadow-[0_0_25px_#00eaffaa]
              hover:border-cyan-400 
              active:scale-95 
              transition-all
            "
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-5 w-5 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin"></span>
                Creating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor">
                  <path strokeWidth="2" d="M18 9v6M12 9v6M6 9v6M4 5h16v14H4z" />
                </svg>
                Create Account
              </span>
            )}
          </Button>
        </form>

        {/* TERMS */}
        <p className="mt-4 text-center text-xs text-cyan-200/60">
          By signing up, you agree to our{" "}
          <Link to="/terms" className="text-cyan-300 hover:underline">
            Terms
          </Link>{" "}
          &{" "}
          <Link to="/privacy" className="text-cyan-300 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* CUSTOM ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.15); }
          66% { transform: translate(-20px, 30px) scale(0.9); }
        }
        .animate-fadeIn { animation: fadeIn 0.7s ease-out; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        .animate-blob { animation: blob 9s infinite; }

        /* Gamer Cyan Inputs */
        .gamer-input input {
          background: #05131A !important;
          color: #00eaff !important;
          border: 1px solid #0b2e3a !important;
          box-shadow: inset 0 0 8px #00eaff33;
        }
        .gamer-input input:focus {
          border-color: #00eaff !important;
          box-shadow: 0 0 12px #00eaff99;
        }
        label {
          color: #7bdfff !important;
        }
      `}</style>

    </div>
  )
}

export default Signup
