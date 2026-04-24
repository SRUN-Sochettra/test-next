# test-next

A frontend interface module for managing employees and products. Built with Next.js 16, React 19, and Tailwind CSS v4. Designed to interface directly with a Java Spring Boot backend API.

## Core Modules
* **Employee Management:** Interface for CRUD operations on employee records.
* **Product Management:** Interface for inventory and product catalog tracking.
* **Secure Access:** JWT-based authentication and protected action routing.

## Technology Stack
* Next.js 16.2.2
* React 19.2.4
* Tailwind CSS v4
* React Hot Toast
* Babel Plugin React Compiler

## Environment Configuration

Configure the backend API endpoint in a `.env.local` file. The application targets port `8080` by default.

NEXT_PUBLIC_API_URL=http://localhost:8080

## Initialization

1. Install dependencies:
npm install

2. Execute the development server:
npm run dev

3. Access the local environment at http://localhost:3000.

---

src/app/about/page.js

export default function AboutPage() {
  return (
    <main className="p-8 max-w-7xl mx-auto bg-neutral-950 text-neutral-100 min-h-screen font-mono">
      <h1 className="text-4xl font-bold mb-6 text-cyan-500 tracking-tight">System Identity</h1>
      
      <div className="border border-neutral-800 p-6 rounded-md bg-neutral-900/50 shadow-2xl">
        <p className="text-lg mb-4 text-neutral-300">
          Management System Frontend Module. Designed for high-performance CRUD operations and seamless backend synchronization.
        </p>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Technical Specifications</h2>
          <ul className="list-none space-y-2 text-neutral-400">
            <li className="flex items-center gap-2">
              <span className="text-cyan-500">▹</span> Framework: Next.js 16 (App Router)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-500">▹</span> Interface: React 19
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-500">▹</span> Engine: Tailwind CSS v4
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-500">▹</span> API Gateway: http://localhost:8080
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
