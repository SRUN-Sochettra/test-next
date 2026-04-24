"use client";

import { getProductById, updateProduct } from "@/src/lib/api/products";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateProduct({ categories }) {
    const [id, setId] = useState("");
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetch = async (e) => {
        e.preventDefault();

        if (!id.trim()) {
            toast.error("Please enter an ID");
            return;
        }

        setLoading(true);
        setFormData(null);

        try {
            const data = await getProductById(id);
            if (!data) throw new Error("Product not found");
            setFormData({
                productName: data.productName || "",
                productPrice: data.productPrice || "",
                categoryId: data.categoryId || "",
            });
            toast.success(`Product #${id} loaded!`);
        } catch (err) {
            toast.error(err.message || "Product not found");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
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

            const result = await updateProduct(id, productData);
            const data = result.data ?? result;

            toast.success(`Product "${data.productName}" updated!`);
            setFormData(null);
            setId("");
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            {/* Step 1: Search */}
            {!formData && (
                <form onSubmit={handleFetch} className="flex gap-2">
                    <input
                        type="text"
                        inputMode="numeric"
                        value={id}
                        onChange={(e) => setId(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter Product ID..."
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-orange-500/20 whitespace-nowrap"
                    >
                        {loading ? "Loading..." : "Find"}
                    </button>
                </form>
            )}

            {/* Step 2: Edit form */}
            {formData && (
                <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                    <div className="bg-orange-500/10 border border-orange-500/30 px-3 py-2 rounded-lg">
                        <p className="text-sm text-orange-400">
                            ✏️ Editing Product ID: <span className="font-semibold">#{id}</span>
                        </p>
                    </div>

                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        placeholder="Product Name *"
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="number"
                            name="productPrice"
                            value={formData.productPrice}
                            onChange={handleChange}
                            placeholder="Price"
                            step="0.01"
                            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        />
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="bg-gray-700 border border-gray-600 text-white p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-orange-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-orange-500/20 flex-1"
                        >
                            {loading ? "Updating..." : "Update Product"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setFormData(null);
                                setId("");
                            }}
                            className="bg-gray-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-500 transition-all duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}