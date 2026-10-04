import { Search, Heart, ShoppingCart, User } from "lucide-react";
import logo from "../pictures/logo.png";
import { useState } from "react";

const Navbar = () => {
  const  [active, setactive] = useState("Home")
  const navItems = [
    "Home",
    "Shop",
    "Categories",
    "New Arrivals",
    "Sale",
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-blue-50">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <img
          src={logo}
          alt="GENZ STORE"
          className="h-16 w-auto cursor-pointer bg-blue-50 rounded-full"
        />

        {/* Navigation */}
        <ul className="hidden gap-8 font-medium text-gray-700 lg:flex">
          {navItems.map((item) => (
            <li
              key={item}
              className="group relative cursor-pointer transition hover:scale-110"
            >
              {item}

              <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className="relative hidden xl:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="w-80 rounded-full border border-gray-300 py-2.5 pl-11 pr-4 outline-none focus:border-blue-600"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">

          <button className="cursor-pointer transition hover:text-blue-600">
            <Heart size={22} />
          </button>

          <button className="relative cursor-pointer transition hover:text-blue-600">
            <ShoppingCart size={22} />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              2
            </span>
          </button>

          <button className="cursor-pointer transition hover:text-blue-600">
            <User size={22} />
          </button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;