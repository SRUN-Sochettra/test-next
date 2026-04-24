// lib/api/employees.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// GET all employees
export async function getEmployees() {
    const res = await fetch(`${API_URL}/api/v1/employees/all`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch employees: ${res.status}`);
    }

    const responseBody = await res.json();
    
    // Extract the array from the Spring Boot ApiResponse wrapper.
    // IMPORTANT: Change '.data' to whatever the actual variable name 
    // is inside your ApiResponse.java class.
    return responseBody.data; 
}

// GET single employee
export async function getEmployeeById(id) {
    const res = await fetch(`${API_URL}/api/v1/employees/${id}`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Employee not found: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
}

// POST - create employee
export async function createEmployee(employeeData) {
    const res = await fetch(`${API_URL}/api/v1/employees/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
    });

    if (!res.ok) {
        throw new Error(`Failed to create employee: ${res.status}`);
    }

    const json = await res.json();
    return json;
}

// PUT - update employee
export async function updateEmployee(id, employeeData) {
    const res = await fetch(`${API_URL}/api/v1/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
    });

    if (!res.ok) {
        throw new Error(`Failed to update employee: ${res.status}`);
    }

    const json = await res.json();
    return json;
}

// DELETE employee
export async function deleteEmployee(id) {
    const res = await fetch(`${API_URL}/api/v1/employees/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to delete employee: ${res.status}`);
    }

    return res.ok;
}