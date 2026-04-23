// app/employees/page.js
import { getEmployees } from '@/lib/api/employees';

export default async function EmployeesPage() {
    const employees = await getEmployees();

    return (
        <ul>
            {employees.map(employee => (
                <li key={employee.id}>{employee.name}</li>
            ))}
        </ul>
    );
}