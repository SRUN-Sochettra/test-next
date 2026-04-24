"use client";

import { createEmployee } from "@/src/lib/api/employees";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateEmployee() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        salary: "",
        department: "",
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

        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
            toast.error("First name, last name, and email are required");
            return;
        }

        setLoading(true);

        try {
            const employeeData = {
                ...formData,
                salary: formData.salary ? parseFloat(formData.salary) : 0,
            };

            const result = await createEmployee(employeeData);
            const data = result.data ?? result;

            toast.success(
                `Employee "${data.firstName} ${data.lastName}" created!`
            );

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                salary: "",
                department: "",
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
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name *"
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name *"
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email *"
                    className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Salary"
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Department"
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-green-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-green-500/20"
                >
                    {loading ? "Creating..." : "Create Employee"}
                </button>
            </form>
        </div>
    );
}