import {
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const navLinks = ["Home", "Movies", "TV Shows", "New and Popular", "My List"];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
      {/* Left: Brand + Nav links */}
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-2xl font-black bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent flex-shrink-0 tracking-tight"
        >
          Terebi
        </Link>

        <nav className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li className="text-gray-400 hover:text-white transition-colors duration-200">
              <Link to="/home">Home</Link>
            </li>
            <li className="text-gray-400 hover:text-white transition-colors duration-200">
              <Link to="/movies">Movies</Link>
            </li>
            <li className="text-gray-400 hover:text-white transition-colors duration-200">
              <Link to="/tv">TV Shows</Link>
            </li>
            <li className="text-gray-400 hover:text-white transition-colors duration-200">
              <Link to="/new-and-popular">New and Popular</Link>
            </li>
            <li className="text-gray-400 hover:text-white transition-colors duration-200">
              <Link to="/my-list">My List</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-5">
        <button className="text-gray-400 hover:text-white transition-colors duration-200">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors duration-200 relative">
          <BellIcon className="h-5 w-5" />
          {/* Notification dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-pink-500 rounded-full" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors duration-200">
          <UserCircleIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
