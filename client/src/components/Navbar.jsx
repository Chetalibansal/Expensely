import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Expensely 💰
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/dashboard" className="hover:text-indigo-600 font-medium transition">Dashboard</Link>
          <Link to="/transactions" className="hover:text-indigo-600 font-medium transition">Transactions</Link>
          <Link to="/budget" className="hover:text-indigo-600 font-medium transition">Budget</Link>
          <Link to="/reports" className="hover:text-indigo-600 font-medium transition">Reports</Link>
          <Link to="/logout" className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm">
            Logout
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-4">
          <Link to="/dashboard" onClick={toggleMenu} className="text-gray-700 hover:text-indigo-600">
            Dashboard
          </Link>
          <Link to="/transactions" onClick={toggleMenu} className="text-gray-700 hover:text-indigo-600">
            Transactions
          </Link>
          <Link to="/budget" onClick={toggleMenu} className="text-gray-700 hover:text-indigo-600">
            Budget
          </Link>
          <Link to="/reports" onClick={toggleMenu} className="text-gray-700 hover:text-indigo-600">
            Reports
          </Link>
          <Link to="/logout" onClick={toggleMenu} className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm">
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
