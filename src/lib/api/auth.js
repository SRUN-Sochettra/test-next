const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function login(username, password) {
    const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
        throw new Error(json.message || "Login failed");
    }

    return json.data;
}

export async function register(username, password) {
    const res = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
        throw new Error(json.message || "Registration failed");
    }

    return json.data;
}