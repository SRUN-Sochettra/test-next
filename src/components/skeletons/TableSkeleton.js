export default function TableSkeleton({ rows = 5, columns = 6 }) {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden animate-pulse">
            {/* Table Header Skeleton */}
            <div className="bg-gray-700 px-6 py-4">
                <div className="h-5 w-40 bg-gray-600 rounded" />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="border-b border-gray-600">
                        <tr>
                            {Array.from({ length: columns }).map((_, i) => (
                                <th key={i} className="px-6 py-3">
                                    <div className="h-3 w-20 bg-gray-600 rounded" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: columns }).map((_, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4">
                                        <div
                                            className={`h-4 bg-gray-700 rounded ${
                                                colIndex === 0
                                                    ? "w-12"
                                                    : colIndex === 1
                                                    ? "w-32"
                                                    : "w-24"
                                            }`}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}