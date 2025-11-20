import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const login = async (data) => {
    setError("")
    setIsLoading(true)
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate("/")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#02070A] relative px-4">
      
      {/* Cyber Neon Glow Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Login Box */}
      <div className="relative w-full max-w-md bg-[#030E14] border border-cyan-700 shadow-[0_0_25px_#00eaff55] rounded-2xl p-8 animate-fadeIn">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-28 transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_12px_#00eaff]">
            <Logo width="100%" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-cyan-300 drop-shadow-[0_0_6px_#00eaff]">
          Sign in
        </h2>

        <p className="mt-2 text-center text-sm text-cyan-200/70">
          Don't have an account? {" "}
          <Link
            to="/signup"
            className="text-cyan-300 hover:text-cyan-400 transition-all hover:underline"
          >
            Sign Up →
          </Link>
        </p>

        {/* Error */}
        {error && (
          <div className="mt-5 text-red-400 text-center bg-red-950/40 border border-red-600 rounded-lg p-3 animate-shake">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
          
          {/* Email */}
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
                    "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 animate-shake">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="gamer-input"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 animate-shake">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-all"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="
              w-full px-6 py-3 rounded-xl font-semibold
              bg-[#04141F] text-cyan-300 border border-cyan-600
              shadow-[0_0_15px_#00eaff55] 
              hover:shadow-[0_0_25px_#00eaffaa]
              hover:border-cyan-400 
              active:scale-95 
              transition-all
            "
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-5 w-5 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin"></span>
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign in
                <svg className="w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeWidth="2" d="M14 5l7 7-7 7M3 12h18" />
                </svg>
              </span>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-cyan-300/60">
          Secure login • Protected interface
        </div>
      </div>

      {/* Animations */}
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
        .animate-blob { animation: blob 9s infinite; }
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
