"use client";

import { useState } from "react";

function SortIcon({ field, sortBy, sortOrder }) {
    if (sortBy !== field) return <span className="text-gray-600 ml-1">↕</span>;
    return (
        <span className="text-purple-400 ml-1">
            {sortOrder === "asc" ? "↑" : "↓"}
        </span>
    );
}

export default function ProductTable({ products, categories }) {
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [sortBy, setSortBy] = useState("productId");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const getCategoryName = (categoryId) => {
        const category = categories.find((c) => c.categoryId === categoryId);
        return category ? category.categoryName : "Unknown";
    };

    // Filter
    const filtered = products.filter((product) => {
        const matchesSearch =
            search === "" ||
            product.productName?.toLowerCase().includes(search.toLowerCase()) ||
            product.productId?.toString().includes(search) ||
            getCategoryName(product.categoryId).toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            filterCategory === "" ||
            product.categoryId?.toString() === filterCategory;

        return matchesSearch && matchesCategory;
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

    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleFilter = (value) => {
        setFilterCategory(value);
        setCurrentPage(1);
    };

    const handleRowsPerPage = (value) => {
        setRowsPerPage(Number(value));
        setCurrentPage(1);
    };

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
                        📋 All Products
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search products..."
                                className="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 pl-9 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 w-full sm:w-64"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                🔍
                            </span>
                        </div>

                        <select
                            value={filterCategory}
                            onChange={(e) => handleFilter(e.target.value)}
                            className="bg-gray-600 border border-gray-500 text-white py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <p className="text-gray-400 text-xs mt-2">
                    Showing {startIndex + 1}-{Math.min(endIndex, sorted.length)} of{" "}
                    {sorted.length} products
                    {(search || filterCategory) && (
                        <button
                            onClick={() => {
                                setSearch("");
                                setFilterCategory("");
                                setCurrentPage(1);
                            }}
                            className="ml-2 text-purple-400 hover:text-purple-300 underline"
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
                                onClick={() => handleSort("productId")}
                                className="px-6 py-3 text-gray-400 font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-white transition-colors"
                            >
                                ID <SortIcon field="productId" sortBy={sortBy} sortOrder={sortOrder} />
                            </th>
                            <th
                                onClick={() => handleSort("productName")}
                                className="px-6 py-3 text-gray-400 font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-white transition-colors"
                            >
                                Product Name <SortIcon field="productName" sortBy={sortBy} sortOrder={sortOrder} />
                            </th>
                            <th
                                onClick={() => handleSort("productPrice")}
                                className="px-6 py-3 text-gray-400 font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-white transition-colors"
                            >
                                Price <SortIcon field="productPrice" sortBy={sortBy} sortOrder={sortOrder} />
                            </th>
                            <th
                                onClick={() => handleSort("categoryId")}
                                className="px-6 py-3 text-gray-400 font-medium uppercase tracking-wider text-xs cursor-pointer hover:text-white transition-colors"
                            >
                                Category <SortIcon field="categoryId" sortBy={sortBy} sortOrder={sortOrder} />
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {paginatedData.map((product) => (
                            <tr
                                key={product.productId}
                                className="hover:bg-gray-700 transition-colors duration-150"
                            >
                                <td className="px-6 py-4">
                                    <span className="bg-gray-700 text-purple-400 text-xs font-medium px-2.5 py-1 rounded-full">
                                        #{product.productId}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-white">
                                    {product.productName}
                                </td>
                                <td className="px-6 py-4 text-green-400 font-medium">
                                    ${product.productPrice?.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-purple-600/20 text-purple-400 text-xs font-medium px-2.5 py-1 rounded-full">
                                        {getCategoryName(product.categoryId)}
                                    </span>
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
                        {products.length === 0
                            ? "No products found"
                            : "No products match your search"}
                    </p>
                    <p className="text-sm mt-1">
                        {products.length === 0
                            ? "Create your first product using the form above"
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
                            className="bg-gray-700 border border-gray-600 text-white py-1 px-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    {/* Page navigation */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            ←
                        </button>

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
                                            ? "bg-purple-600 text-white shadow-md"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                >
                                    {page}
                                </button>
                            )
                        )}

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