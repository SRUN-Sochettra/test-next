import { getProducts } from "@/src/lib/api/products";
import { getCategories } from "@/src/lib/api/categories";
import CreateProduct from "@/src/components/product_components/CreateProduct";
import SearchProductById from "@/src/components/product_components/SearchProductById";
import UpdateProduct from "@/src/components/product_components/UpdateProduct";
import DeleteProduct from "@/src/components/product_components/DeleteProduct";
import ProductTable from "@/src/components/product_components/ProductTable";
import ProtectedAction from "@/src/components/ProtectedAction";

export default async function ProductsPage() {
    const products = await getProducts();
    const categories = await getCategories();

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-white tracking-wide">
                        📦 Product Management
                    </h1>
                    <p className="text-gray-400 mt-2">
                        <span className="bg-purple-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                            {products.length} products
                        </span>
                        <span className="ml-2 bg-gray-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                            {categories.length} categories
                        </span>
                        <span className="ml-3">in the system</span>
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Action Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Create - needs USER or ADMIN */}
                    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-green-600 px-4 py-2 flex items-center justify-between">
                            <h2 className="text-white font-semibold text-sm tracking-wide uppercase">
                                ➕ Add Product
                            </h2>
                            <span className="text-white/60 text-xs">USER+</span>
                        </div>
                        <ProtectedAction requiredRole="USER">
                            <CreateProduct categories={categories} />
                        </ProtectedAction>
                    </div>

                    {/* Search - public */}
                    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-purple-600 px-4 py-2 flex items-center justify-between">
                            <h2 className="text-white font-semibold text-sm tracking-wide uppercase">
                                🔍 Search Product
                            </h2>
                            <span className="text-white/60 text-xs">PUBLIC</span>
                        </div>
                        <SearchProductById categories={categories} />
                    </div>

                    {/* Update - needs USER or ADMIN */}
                    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-orange-600 px-4 py-2 flex items-center justify-between">
                            <h2 className="text-white font-semibold text-sm tracking-wide uppercase">
                                ✏️ Update Product
                            </h2>
                            <span className="text-white/60 text-xs">USER+</span>
                        </div>
                        <ProtectedAction requiredRole="USER">
                            <UpdateProduct categories={categories} />
                        </ProtectedAction>
                    </div>

                    {/* Delete - needs ADMIN only */}
                    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-red-600 px-4 py-2 flex items-center justify-between">
                            <h2 className="text-white font-semibold text-sm tracking-wide uppercase">
                                🗑️ Delete Product
                            </h2>
                            <span className="text-white/60 text-xs">ADMIN</span>
                        </div>
                        <ProtectedAction requiredRole="ADMIN">
                            <DeleteProduct categories={categories} />
                        </ProtectedAction>
                    </div>
                </div>

                {/* Table - public */}
                <ProductTable products={products} categories={categories} />
            </div>
        </div>
    );
}