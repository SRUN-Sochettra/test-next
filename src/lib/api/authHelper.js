/**
 * Returns common auth headers for protected API requests.
 * Reads the JWT token from localStorage (client-side only).
 */
export function getAuthHeaders() {
    const headers = {
        "Content-Type": "application/json",
    };

    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    return headers;
}

/**
 * Checks an API response for auth failures (401/403).
 * If detected, clears local session data and redirects to login.
 * Call this after every authenticated fetch.
 */
export function handleAuthError(res) {
    if (res.status === 401 || res.status === 403) {
        if (typeof window !== "undefined") {
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            // Dispatch a custom event so AuthContext can react and reset state
            window.dispatchEvent(new Event("auth-expired"));

            window.location.href = "/login";
        }

        throw new Error(
            res.status === 401
                ? "Session expired. Please login again."
                : "Access denied. Insufficient permissions."
        );
    }
}
