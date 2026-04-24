"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logoutUser, isLoggedIn } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/employees", label: "Employees" },
        { href: "/products", label: "Products" },
    ];

    const handleLogout = () => {
        logoutUser();
        setIsOpen(false);
        router.push("/");
    };

    return (
        <nav className="bg-gray-900 border-b border-gray-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl font-bold text-white tracking-wide hover:text-blue-400 transition-colors duration-200"
                    >
                        🚀 Next.js App
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                    ${
                                        pathname === link.href
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Auth Button (Desktop) */}
                        {isLoggedIn() ? (
                            <button
                                id="desktop-logout-btn"
                                onClick={handleLogout}
                                className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-all duration-200 shadow-md cursor-pointer"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className={`ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                    ${
                                        pathname === "/login"
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
                                    }`}
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                    >
                        {isOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                    ${
                                        pathname === link.href
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Auth Button (Mobile) */}
                        {isLoggedIn() ? (
                            <button
                                id="mobile-logout-btn"
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-all duration-200 cursor-pointer"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-200"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}