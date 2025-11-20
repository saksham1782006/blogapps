import React, { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const location = useLocation();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "My Posts", slug: "/my-posts", active: authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
    ];

    const go = (slug) => {
        navigate(slug);
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 
            ${isScrolled ? "bg-slate-900/90 shadow-lg" : "bg-slate-900/70"}
            border-b border-slate-800 backdrop-blur-xl`}
        >
            <Container>
                {/* MAIN NAV */}
                <nav className="flex items-center justify-between py-3">

                    {/* LOGO */}
                    <div
                        className="cursor-pointer flex items-center"
                        onClick={() => navigate("/")}
                    >
                        <Logo width="60px" />
                    </div>

                    {/* DESKTOP NAV */}
                    <ul className="hidden md:flex items-center gap-4">

                        {navItems.map(
                            (item) =>
                                item.active && (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => go(item.slug)}
                                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all
                                            ${
                                                location.pathname === item.slug
                                                    ? "text-cyan-300 bg-slate-800 border border-cyan-500/40 shadow-md"
                                                    : "text-slate-300 hover:text-cyan-300 hover:bg-slate-800/70"
                                            }`}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                        )}

                        {authStatus && <LogoutBtn />}
                    </ul>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="md:hidden text-cyan-300 p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </nav>

                {/* MOBILE NAV */}
                <div
                    className={`md:hidden transition-all duration-500 overflow-hidden 
                    bg-slate-900/95 border-t border-slate-800
                    ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
                >
                    <ul className="py-4 space-y-2">

                        {navItems.map(
                            (item) =>
                                item.active && (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => go(item.slug)}
                                            className={`w-full px-5 py-3 text-left text-sm font-medium rounded-md transition-all
                                            ${
                                                location.pathname === item.slug
                                                    ? "bg-slate-800 text-cyan-300 border border-cyan-500/40"
                                                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
                                            }`}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                        )}

                        {authStatus && (
                            <li className="border-t border-slate-800 pt-2">
                                <LogoutBtn className="w-full" />
                            </li>
                        )}
                    </ul>
                </div>
            </Container>
        </header>
    );
}

export default Header;

