// lib/api/employees.js
const API_URL = process.env.API_URL || 'http://localhost:8080';

// GET all employees
export async function getEmployees() {
    const res = await fetch(`${API_URL}/api/employees`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch employees: ${res.status}`);
    }

    return res.json();
}

// GET single employee
export async function getEmployeeById(id) {
    const res = await fetch(`${API_URL}/api/employees/${id}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Employee not found: ${res.status}`);
    }

    return res.json();
}

// POST - create employee
export async function createEmployee(employeeData) {
    const res = await fetch(`${API_URL}/api/employees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
    });

    if (!res.ok) {
        throw new Error(`Failed to create employee: ${res.status}`);
    }

    return res.json();
}

// PUT - update employee
export async function updateEmployee(id, employeeData) {
    const res = await fetch(`${API_URL}/api/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
    });

    if (!res.ok) {
        throw new Error(`Failed to update employee: ${res.status}`);
    }

    return res.json();
}

// DELETE employee
export async function deleteEmployee(id) {
    const res = await fetch(`${API_URL}/api/employees/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error(`Failed to delete employee: ${res.status}`);
    }

    return res.ok;
}