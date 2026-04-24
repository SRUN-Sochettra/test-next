"use client";

import { getEmployeeById } from "@/src/lib/api/employees";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SearchEmployeeById() {
    const [id, setId] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!id.trim()) {
            toast.error("Please enter an ID");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const data = await getEmployeeById(id);
            if (!data) throw new Error("Employee not found");
            setResult(data);
            toast.success(`Employee #${data.employeeId} found!`);
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
                    placeholder="Enter Employee ID..."
                    className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 p-2.5 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-blue-500/20 whitespace-nowrap"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {result && (
                <div className="bg-blue-500/10 border border-blue-500/50 p-4 rounded-lg text-sm">
                    <h2 className="font-semibold text-blue-400 text-base mb-3">
                        🔍 Employee Found
                    </h2>
                    <div className="space-y-1.5 text-gray-300">
                        <p>
                            <span className="text-gray-400 font-medium">ID:</span>{" "}
                            <span className="text-blue-400">#{result.employeeId}</span>
                        </p>
                        <p>
                            <span className="text-gray-400 font-medium">Name:</span>{" "}
                            {result.firstName} {result.lastName}
                        </p>
                        <p>
                            <span className="text-gray-400 font-medium">Email:</span>{" "}
                            {result.email}
                        </p>
                        <p>
                            <span className="text-gray-400 font-medium">Department:</span>{" "}
                            <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                                {result.department}
                            </span>
                        </p>
                        <p>
                            <span className="text-gray-400 font-medium">Salary:</span>{" "}
                            <span className="text-green-400">
                                ${result.salary?.toLocaleString()}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}