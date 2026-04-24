export default function CardSkeleton() {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden animate-pulse">
            {/* Card Header */}
            <div className="bg-gray-700 px-4 py-2">
                <div className="h-4 w-32 bg-gray-600 rounded" />
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 bg-gray-700 rounded-lg" />
                    <div className="h-10 bg-gray-700 rounded-lg" />
                </div>
                <div className="h-10 bg-gray-700 rounded-lg" />
                <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 bg-gray-700 rounded-lg" />
                    <div className="h-10 bg-gray-700 rounded-lg" />
                </div>
                <div className="h-10 bg-gray-600 rounded-lg" />
            </div>
        </div>
    );
}