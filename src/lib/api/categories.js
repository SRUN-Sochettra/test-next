const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// GET all categories
export async function getCategories() {
    const res = await fetch(`${API_URL}/api/v1/categories/all`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
}