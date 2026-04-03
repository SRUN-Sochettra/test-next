import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">My App</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-300 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
