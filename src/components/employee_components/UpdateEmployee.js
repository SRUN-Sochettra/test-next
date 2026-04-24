"use client";

import { getEmployeeById, updateEmployee } from "@/src/lib/api/employees";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateEmployee() {
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
            const data = await getEmployeeById(id);
            if (!data) throw new Error("Employee not found");
            setFormData({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                salary: data.salary || "",
                department: data.department || "",
            });
            toast.success(`Employee #${id} loaded!`);
        } catch (err) {
            toast.error(err.message || "Employee not found");
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

            const result = await updateEmployee(id, employeeData);
            const data = result.data ?? result;

            toast.success(
                `Employee "${data.firstName} ${data.lastName}" updated!`
            );
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
                        placeholder="Enter Employee ID..."
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-yellow-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-yellow-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-yellow-500/20 whitespace-nowrap"
                    >
                        {loading ? "Loading..." : "Find"}
                    </button>
                </form>
            )}

            {/* Step 2: Edit form */}
            {formData && (
                <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                    <div className="bg-yellow-500/10 border border-yellow-500/30 px-3 py-2 rounded-lg">
                        <p className="text-sm text-yellow-400">
                            ✏️ Editing Employee ID: <span className="font-semibold">#{id}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name *"
                            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name *"
                            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email *"
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="number"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="Salary"
                            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        />
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="Department"
                            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-yellow-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-yellow-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-yellow-500/20 flex-1"
                        >
                            {loading ? "Updating..." : "Update Employee"}
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
