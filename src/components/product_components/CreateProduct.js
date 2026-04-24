"use client";

import { createProduct } from "@/src/lib/api/products";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateProduct({ categories }) {
    const [formData, setFormData] = useState({
        productName: "",
        productPrice: "",
        categoryId: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.productName.trim()) {
            toast.error("Product name is required");
            return;
        }

        setLoading(true);

        try {
            const productData = {
                ...formData,
                productPrice: formData.productPrice ? parseFloat(formData.productPrice) : 0,
                categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
            };

            const result = await createProduct(productData);
            const data = result.data ?? result;

            toast.success(`Product "${data.productName}" created!`);

            setFormData({
                productName: "",
                productPrice: "",
                categoryId: "",
            });
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Product Name *"
                    className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="number"
                        name="productPrice"
                        value={formData.productPrice}
                        onChange={handleChange}
                        placeholder="Price"
                        step="0.01"
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="bg-gray-700 border border-gray-600 text-white p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-green-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-green-500/20"
                >
                    {loading ? "Creating..." : "Create Product"}
                </button>
            </form>
        </div>
    );
}