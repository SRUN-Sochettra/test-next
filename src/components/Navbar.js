import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Next.js App</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-gray-30">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-300  ">
            Contact
          </Link>
          <Link href="/employees" className="hover:text-gray-300">
            Employees
          </Link>
        </div>
      </div>
    </nav>
  );
}
