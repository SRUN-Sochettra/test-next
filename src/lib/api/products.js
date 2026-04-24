import { getAuthHeaders, handleAuthError } from "./authHelper";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// GET all products (public)
export async function getProducts() {
    const res = await fetch(`${API_URL}/api/v1/products/all`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
}

// GET single product (public)
export async function getProductById(id) {
    const res = await fetch(`${API_URL}/api/v1/products/${id}`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Product not found: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
}

// POST - create product (needs USER or ADMIN)
export async function createProduct(productData) {
    const res = await fetch(`${API_URL}/api/v1/products/add`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
    });

    // Auto-logout on auth failure
    handleAuthError(res);

    if (!res.ok) {
        throw new Error(`Failed to create product: ${res.status}`);
    }

    const json = await res.json();
    return json;
}

// PUT - update product (needs USER or ADMIN)
export async function updateProduct(id, productData) {
    const res = await fetch(`${API_URL}/api/v1/products/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
    });

    // Auto-logout on auth failure
    handleAuthError(res);

    if (!res.ok) {
        throw new Error(`Failed to update product: ${res.status}`);
    }

    const json = await res.json();
    return json;
}

// DELETE product (needs ADMIN only)
export async function deleteProduct(id) {
    const res = await fetch(`${API_URL}/api/v1/products/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    // Auto-logout on auth failure
    handleAuthError(res);

    if (!res.ok) {
        throw new Error(`Failed to delete product: ${res.status}`);
    }

    return res.ok;
}