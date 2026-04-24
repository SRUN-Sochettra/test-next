"use client";

import { getProductById } from "@/src/lib/api/products";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SearchProductById({ categories }) {
    const [id, setId] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const getCategoryName = (categoryId) => {
        const category = categories.find((c) => c.categoryId === categoryId);
        return category ? category.categoryName : "Unknown";
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!id.trim()) {
            toast.error("Please enter an ID");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const data = await getProductById(id);
            if (!data) throw new Error("Product not found");
            setResult(data);
            toast.success(`Product #${data.productId} found!`);
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <input
                    type="text"
                    inputMode="numeric"
                    value={id}
                    onChange={(e) => setId(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter Product ID..."
                    className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-purple-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-purple-500/20 whitespace-nowrap"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {result && (
                <div className="bg-purple-500/10 border border-purple-500/50 p-4 rounded-lg text-sm">
                    <h2 className="font-semibold text-purple-400 text-base mb-3">
                        🔍 Product Found
                    </h2>
                    <div className="space-y-1.5 text-gray-300">
                        <p>
                            <span className="text-gray-400 font-medium">ID:</span>{" "}
                            <span className="text-purple-400">#{result.productId}</span>
                        </p>
                        <p>
                            <span className="text-gray-400 font-medium">Name:</span>{" "}
                            {result.productName}
                        </p>
                        <p>
                            <span className="text-gray-400 font-medium">Price:</span>{" "}
                            <span className="text-green-400">
                                ${result.productPrice?.toLocaleString()}
                            </span>
                        </p>
                        <p>
                            <span className="text-gray-400 font-medium">Category:</span>{" "}
                            <span className="bg-purple-600/20 text-purple-400 text-xs px-2 py-0.5 rounded-full">
                                {getCategoryName(result.categoryId)}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}