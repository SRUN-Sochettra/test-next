export default function HeaderSkeleton() {
    return (
        <div className="bg-gray-800 border-b border-gray-700 shadow-md animate-pulse">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="h-8 w-64 bg-gray-700 rounded mb-3" />
                <div className="flex gap-2">
                    <div className="h-6 w-28 bg-gray-700 rounded-full" />
                    <div className="h-6 w-20 bg-gray-700 rounded-full" />
                </div>
            </div>
        </div>
    );
}