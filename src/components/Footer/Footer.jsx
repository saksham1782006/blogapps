import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
    return (
        <footer className="relative bg-slate-950 border-t border-cyan-500/20 py-16 overflow-hidden">

            {/* Neon Grid Background */}
            <div className="absolute inset-0 opacity-[0.35] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.25) 1px, transparent 0)",
                        backgroundSize: "22px 22px",
                    }}
                />
            </div>

            {/* Neon Glow Orbs */}
            <div className="absolute -top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-20 right-10 w-72 h-72 bg-fuchsia-500/20 blur-[120px] rounded-full animate-pulse animation-delay-1000"></div>

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* ========================== */}
                    {/* LOGO / BRAND Section */}
                    {/* ========================== */}
                    <div className="flex flex-col space-y-6 animate-fadeInUp">
                        <div className="relative w-fit group">
                            <div className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 opacity-50 group-hover:opacity-80 transition-all duration-500"></div>

                            <div className="relative border border-cyan-400/40 bg-slate-900/50 p-4 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.45)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.7)] transition-all duration-500">
                                <Logo width="110px" />
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Neon-powered blogging platform for creators, thinkers, and explorers of the Grid.
                        </p>

                        <p className="text-slate-500 text-xs">
                            © 2025 • Built by <span className="text-cyan-300 font-semibold">Saksham</span>
                        </p>
                    </div>

                    {/* ========================== */}
                    {/* SUPPORT Section */}
                    {/* ========================== */}
                    <div className="animate-fadeInUp animation-delay-200">
                        <h3 className="text-cyan-300 uppercase tracking-widest text-xs mb-6 relative inline-block">
                            Support
                            <span className="block w-8 h-[2px] bg-cyan-400 mt-1 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                        </h3>

                        <ul className="space-y-3">
                            {["Account", "Help", "Contact Us", "Customer Support"].map((item, i) => (
                                <li key={i}>
                                    <Link
                                        to="/"
                                        className="text-slate-400 hover:text-cyan-300 transition-all duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,1)] transition-all"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ========================== */}
                    {/* LEGALS Section */}
                    {/* ========================== */}
                    <div className="animate-fadeInUp animation-delay-400">
                        <h3 className="text-fuchsia-300 uppercase tracking-widest text-xs mb-6 relative inline-block">
                            Legals
                            <span className="block w-8 h-[2px] bg-fuchsia-400 mt-1 shadow-[0_0_10px_rgba(236,72,153,1)]"></span>
                        </h3>

                        <ul className="space-y-3">
                            {["Terms & Conditions", "Privacy Policy"].map((item, i) => (
                                <li key={i}>
                                    <Link
                                        to="/"
                                        className="text-slate-400 hover:text-fuchsia-300 transition-all duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-fuchsia-400 group-hover:shadow-[0_0_10px_rgba(236,72,153,1)] transition-all"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ========================== */}
                    {/* SOCIAL Section (FIXED ICONS) */}
                    {/* ========================== */}
                    <div className="animate-fadeInUp animation-delay-600">
                        <h3 className="text-emerald-300 uppercase tracking-widest text-xs mb-6 relative inline-block">
                            Follow Us
                            <span className="block w-8 h-[2px] bg-emerald-400 mt-1 shadow-[0_0_10px_rgba(52,211,153,1)]"></span>
                        </h3>

                        <div className="flex gap-4">

                            {/* GitHub SVG */}
                            <a
                                href="https://github.com/Abhishek-Sharma08"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 
                                text-slate-400 hover:text-white hover:border-cyan-400 
                                hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-300 hover:-translate-y-1"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0C5.37 0 0 5.42 0 12.12c0 5.35 3.44 9.89 8.2 11.49.6.11.82-.27.82-.59v-2.1c-3.34.74-4.04-1.32-4.04-1.32-.55-1.41-1.34-1.78-1.34-1.78-1.1-.77.08-.75.08-.75 1.23.09 1.87 1.28 1.87 1.28 1.08 1.88 2.84 1.34 3.53 1.03.11-.8.42-1.34.76-1.65-2.66-.32-5.46-1.36-5.46-6.07 0-1.34.47-2.44 1.24-3.3-.13-.32-.54-1.62.12-3.36 0 0 1.02-.33 3.35 1.26A11.5 11.5 0 0112 5.8c1.03 0 2.07.14 3.04.4 2.32-1.59 3.34-1.26 3.34-1.26.66 1.74.25 3.04.12 3.36.77.86 1.23 1.96 1.23 3.3 0 4.73-2.8 5.75-5.48 6.06.43.38.82 1.14.82 2.32v3.45c0 .33.21.71.82.59C20.56 22 24 17.47 24 12.12 24 5.42 18.63 0 12 0z" />
                                </svg>
                            </a>

                            {/* LinkedIn SVG */}
                            <a
                                href="https://www.linkedin.com/in/abhishek-sharma-796353363/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 
                                text-slate-400 hover:text-white hover:border-fuchsia-400 
                                hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] transition-all duration-300 hover:-translate-y-1"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M4.98 3.5C3.33 3.5 2 4.85 2 6.48c0 1.62 1.32 2.97 2.95 2.97h.03A2.97 2.97 0 007.97 6.5c0-1.63-1.34-3-2.99-3zm.02 4.84H3V21h2.01V8.34zM9 8.34H6.99V21H9V8.34zm1.54 0H9.54V21h1.99v-6.58c0-1.69.32-2.97 2.17-2.97 1.83 0 1.86 1.8 1.86 3.08V21h2V13.8c0-3.63-.77-5.46-3.96-5.46-1.61 0-2.7.88-3.14 1.72h-.05V8.34z" />
                                </svg>
                            </a>

                        </div>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                }
                .animation-delay-200 { animation-delay: 0.2s }
                .animation-delay-400 { animation-delay: 0.4s }
                .animation-delay-600 { animation-delay: 0.6s }
                .animation-delay-1000 { animation-delay: 1s }
            `}</style>
        </footer>
    );
}

export default Footer;

