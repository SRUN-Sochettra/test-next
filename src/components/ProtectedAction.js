"use client";

import { useAuth } from "@/src/context/AuthContext";
import Link from "next/link";

export default function ProtectedAction({ children, requiredRole = "USER" }) {
    const { user, isLoggedIn, isAdmin, loading } = useAuth();

    if (loading) return null;

    // Not logged in
    if (!isLoggedIn()) {
        return (
            <div className="p-5 text-center">
                <p className="text-gray-400 mb-3">🔒 Login required</p>
                <Link
                    href="/login"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 transition-all duration-200"
                >
                    Sign In
                </Link>
            </div>
        );
    }

    // Needs ADMIN but user is not admin
    if (requiredRole === "ADMIN" && !isAdmin()) {
        return (
            <div className="p-5 text-center">
                <p className="text-gray-400 mb-1">🔒 Admin access only</p>
                <p className="text-gray-500 text-xs">
                    You are logged in as{" "}
                    <span className="text-green-400">{user?.role}</span>
                </p>
            </div>
        );
    }

    return children;
}