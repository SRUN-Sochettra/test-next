import HeaderSkeleton from "./HeaderSkeleton";
import CardSkeleton from "./CardSkeleton";
import TableSkeleton from "./TableSkeleton";

export default function PageSkeleton({ columns = 6 }) {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <HeaderSkeleton />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Card Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </div>

                {/* Table Skeleton */}
                <TableSkeleton columns={columns} />
            </div>
        </div>
    );
}