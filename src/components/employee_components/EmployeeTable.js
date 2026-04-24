"use client";

import { useState } from "react";

function SortIcon({ field, sortBy, sortOrder }) {
    if (sortBy !== field) return <span className="text-gray-600 ml-1">↕</span>;
    return (
        <span className="text-blue-400 ml-1">
            {sortOrder === "asc" ? "↑" : "↓"}
        </span>
    );
}

export default function EmployeeTable({ employees }) {
    const [search, setSearch] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("");
    const [sortBy, setSortBy] = useState("employeeId");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const departments = [...new Set(employees.map((e) => e.department))].filter(Boolean);

    // Filter
    const filtered = employees.filter((employee) => {
        const matchesSearch =
            search === "" ||
            employee.firstName?.toLowerCase().includes(search.toLowerCase()) ||
            employee.lastName?.toLowerCase().includes(search.toLowerCase()) ||
            employee.email?.toLowerCase().includes(search.toLowerCase()) ||
            employee.employeeId?.toString().includes(search);

        const matchesDepartment =
            filterDepartment === "" || employee.department === filterDepartment;

        return matchesSearch && matchesDepartment;
    });

    // Sort
    const sorted = [...filtered].sort((a, b) => {
        let valueA = a[sortBy];
        let valueB = b[sortBy];

        if (typeof valueA === "string") {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        }

        if (sortOrder === "asc") {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });

    // Pagination calculations
    const totalPages = Math.ceil(sorted.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = sorted.slice(startIndex, endIndex);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    // Reset to page 1 when search/filter changes
    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleFilter = (value) => {
        setFilterDepartment(value);
        setCurrentPage(1);
    };

    const handleRowsPerPage = (value) => {
        setRowsPerPage(Number(value));
        setCurrentPage(1);
    };

    // Generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (currentPage > 3) pages.push("...");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 2) pages.push("...");

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
            {/* Header with Search & Filters */}
            <div className="bg-gray-700 px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="text-white font-semibold text-lg">
                        📋 All Employees
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search employees..."
                                className="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 pl-9 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full sm:w-64"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                🔍
                            </span>
                        </div>

                        <select
                            value={filterDepartment}
                            onChange={(e) => handleFilter(e.target.value)}
                            className="bg-gray-600 border border-gray-500 text-white py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                            <option value="">All Departments</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <p className="text-gray-400 text-xs mt-2">
                    Showing {startIndex + 1}-{Math.min(endIndex, sorted.length)} of{" "}
                    {sorted.length} employees
                    {(search || filterDepartment) && (
                        <button
                            onClick={() => {
                                setSearch("");
                                setFilterDepartment("");
                                setCurrentPage(1);
                            }}
                            className="ml-2 text-blue-400 hover:text-blue-300 underline"
                        >
                            Clear filters
                        </button>
                    )}
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="border-b border-gray-600">
                        <tr>
                            <th
                                onClick={() => handleSort("employeeId")}
                                className="px-6 py-3 text-gray-400 font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-white transition-colors"
                            >
                                ID <SortIcon field="employeeId" sortBy={sortBy} sortOrder={sortOrder} />
                            </th>
                            <th
                                onClick={() => handleSort("firstName")}
                                className="px-6 py-3 text-gray-400 font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-white transition-colors"
                            >
                                Name <SortIcon field="firstName" sortBy={sortBy} sortOrder={sortOrder} />
                            </th>
                            <th
                                onClick={() => handleSort("email")}
                                className="px-6 py-3 text-gray-400 font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-white transition-colors"
                            >
                                Email <SortIcon field="email" sortBy={sortBy} sortOrder={sortOrder} />
                            </th>
                            <th
                                onClick={() => handleSort("department")}
                                className="px-6 py-3 text-gray-400 font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-white transition-colors"
                            >
                                Department <SortIcon field="department" sortBy={sortBy} sortOrder={sortOrder} />
                            </th>
                            <th
                                onClick={() => handleSort("salary")}
                                className="px-6 py-3 text-gray-400 font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-white transition-colors"
                            >
                                Salary <SortIcon field="salary" sortBy={sortBy} sortOrder={sortOrder} />
                            </th>
                            <th
                                onClick={() => handleSort("createdAt")}
                                className="px-6 py-3 text-gray-400 font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-white transition-colors"
                            >
                                Created At <SortIcon field="createdAt" sortBy={sortBy} sortOrder={sortOrder} />
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {paginatedData.map((employee) => (
                            <tr
                                key={employee.employeeId}
                                className="hover:bg-gray-700 transition-colors duration-150"
                            >
                                <td className="px-6 py-4">
                                    <span className="bg-gray-700 text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full">
                                        #{employee.employeeId}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-white">
                                    {employee.firstName} {employee.lastName}
                                </td>
                                <td className="px-6 py-4 text-gray-300">
                                    {employee.email}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-blue-600/20 text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full">
                                        {employee.department}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-green-400 font-medium">
                                    ${employee.salary?.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-xs">
                                    {new Date(employee.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        }
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty state */}
            {sorted.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    <p className="text-lg">
                        {employees.length === 0
                            ? "No employees found"
                            : "No employees match your search"}
                    </p>
                    <p className="text-sm mt-1">
                        {employees.length === 0
                            ? "Create your first employee using the form above"
                            : "Try a different search term or filter"}
                    </p>
                </div>
            )}

            {/* Pagination */}
            {sorted.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Rows per page */}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>Rows per page:</span>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => handleRowsPerPage(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-white py-1 px-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    {/* Page navigation */}
                    <div className="flex items-center gap-1">
                        {/* Previous */}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            ←
                        </button>

                        {/* Page numbers */}
                        {getPageNumbers().map((page, index) =>
                            page === "..." ? (
                                <span
                                    key={`dots-${index}`}
                                    className="px-2 py-1.5 text-gray-500 text-sm"
                                >
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        currentPage === page
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                >
                                    {page}
                                </button>
                            )
                        )}

                        {/* Next */}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            →
                        </button>
                    </div>

                    {/* Page info */}
                    <p className="text-sm text-gray-400">
                        Page {currentPage} of {totalPages}
                    </p>
                </div>
            )}
        </div>
    );
}