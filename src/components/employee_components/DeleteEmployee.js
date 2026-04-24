"use client";

import { getEmployeeById, deleteEmployee } from "@/src/lib/api/employees";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteEmployee() {
    const [id, setId] = useState("");
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleFetch = async (e) => {
        e.preventDefault();

        if (!id.trim()) {
            toast.error("Please enter an ID");
            return;
        }

        setLoading(true);
        setEmployee(null);
        setShowConfirm(false);

        try {
            const data = await getEmployeeById(id);
            if (!data) throw new Error("Employee not found");
            setEmployee(data);
            setShowConfirm(true);
        } catch (err) {
            toast.error(err.message || "Employee not found");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);

        try {
            await deleteEmployee(id);
            toast.success(
                `Employee "${employee.firstName} ${employee.lastName}" deleted!`
            );
            setEmployee(null);
            setShowConfirm(false);
            setId("");
        } catch (err) {
            toast.error(err.message || "Failed to delete employee");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEmployee(null);
        setShowConfirm(false);
        setId("");
    };

    return (
        <div className="p-5">
            {/* Step 1: Search */}
            {!showConfirm && (
                <form onSubmit={handleFetch} className="flex gap-2">
                    <input
                        type="text"
                        inputMode="numeric"
                        value={id}
                        onChange={(e) => setId(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter Employee ID..."
                        className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-red-500/20 whitespace-nowrap"
                    >
                        {loading ? "Loading..." : "Find"}
                    </button>
                </form>
            )}

            {/* Step 2: Confirm delete */}
            {showConfirm && employee && (
                <div>
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg mb-4">
                        <h2 className="font-semibold text-base mb-3 text-red-400">
                            ⚠️ Are you sure you want to delete this employee?
                        </h2>
                        <div className="space-y-1.5 text-sm text-gray-300">
                            <p>
                                <span className="text-gray-400 font-medium">ID:</span>{" "}
                                <span className="text-blue-400">#{employee.employeeId}</span>
                            </p>
                            <p>
                                <span className="text-gray-400 font-medium">Name:</span>{" "}
                                {employee.firstName} {employee.lastName}
                            </p>
                            <p>
                                <span className="text-gray-400 font-medium">Email:</span>{" "}
                                {employee.email}
                            </p>
                            <p>
                                <span className="text-gray-400 font-medium">Department:</span>{" "}
                                <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                                    {employee.department}
                                </span>
                            </p>
                            <p>
                                <span className="text-gray-400 font-medium">Salary:</span>{" "}
                                <span className="text-green-400">
                                    ${employee.salary?.toLocaleString()}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-red-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-red-500/20 flex-1"
                        >
                            {loading ? "Deleting..." : "Yes, Delete"}
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={loading}
                            className="bg-gray-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-500 disabled:opacity-50 transition-all duration-200 flex-1"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}