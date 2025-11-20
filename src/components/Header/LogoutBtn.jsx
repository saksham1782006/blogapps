import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const logoutHandler = () => {
        setIsLoading(true)
        authService.logout()
            .then(() => {
                dispatch(logout())
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <button
            onClick={logoutHandler}
            disabled={isLoading}
            className="
            group relative w-full md:w-auto px-6 py-3 md:py-2 
            font-semibold text-sm tracking-wide
            text-white 
            bg-[#0f0f1a] border border-[#6d28d9]/50 
            rounded-xl md:rounded-2xl
            shadow-[0_0_12px_rgba(109,40,217,0.5)]
            hover:shadow-[0_0_20px_rgba(139,92,246,0.9)]
            hover:border-[#a78bfa]
            transition-all duration-300 ease-out
            overflow-hidden
            transform hover:scale-[1.08] active:scale-95
            "
        >

            {/* Neon gradient sweep */}
            <span className="
                absolute inset-0 
                bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600
                opacity-0 group-hover:opacity-20 
                blur-xl
                transition-opacity duration-500
            "></span>

            {/* Outer aura on hover */}
            <span className="
                absolute inset-0 
                rounded-xl md:rounded-2xl
                border border-fuchsia-500/20
                opacity-0 group-hover:opacity-40
                blur-[3px]
                transition-all duration-500
            "></span>

            <span className="relative flex items-center justify-center gap-2">

                {isLoading ? (
                    <>
                        {/* Gamer spinner */}
                        <svg
                            className="animate-spin h-5 w-5 text-fuchsia-400 drop-shadow-[0_0_6px_rgba(244,114,182,0.8)]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>

                        <span className="text-fuchsia-400 animate-pulse">
                            Logging out...
                        </span>
                    </>
                ) : (
                    <>
                        <svg
                            className="w-5 h-5 text-fuchsia-300 transition-transform duration-300 group-hover:rotate-12 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>

                        <span className="tracking-wider">
                            Logout
                        </span>
                    </>
                )}
            </span>
        </button>
    )
}

export default LogoutBtn

