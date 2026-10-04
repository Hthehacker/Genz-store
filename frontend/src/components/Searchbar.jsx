import React from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="relative w-full max-w-xl">
        <FaSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />

        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-full border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>
    </div>
  );
};

export default Searchbar;