"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/src/lib/api/auth";
import { useAuth } from "@/src/context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { loginUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            toast.error("Username and password are required");
            return;
        }

        if (!isLogin && password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            let data;

            if (isLogin) {
                data = await login(username, password);
                toast.success(`Welcome back, ${data.username}!`);
            } else {
                data = await register(username, password);
                toast.success(`Account created! Welcome, ${data.username}!`);
            }

            loginUser(data);
            router.push("/");
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">🚀</h1>
                    <h2 className="text-2xl font-bold text-white">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-gray-400 mt-1">
                        {isLogin
                            ? "Sign in to your account"
                            : "Register a new account"}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username..."
                                className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password..."
                                className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-blue-500/20 mt-2"
                        >
                            {loading
                                ? isLogin
                                    ? "Signing in..."
                                    : "Creating account..."
                                : isLogin
                                ? "Sign In"
                                : "Create Account"}
                        </button>
                    </form>

                    {/* Toggle */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            {isLogin
                                ? "Don't have an account?"
                                : "Already have an account?"}{" "}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setUsername("");
                                    setPassword("");
                                }}
                                className="text-blue-400 hover:text-blue-300 font-medium underline"
                            >
                                {isLogin ? "Register" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Demo credentials */}
                <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <p className="text-gray-400 text-xs font-medium mb-2">
                        Demo Credentials:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-gray-700/50 rounded-lg p-2">
                            <p className="text-blue-400 font-medium">Admin</p>
                            <p className="text-gray-400">admin / admin123</p>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-2">
                            <p className="text-green-400 font-medium">User</p>
                            <p className="text-gray-400">user / user123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}