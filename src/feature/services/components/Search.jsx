import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchService = ({ onSearch }) => {
  const [searchService, setSearchService] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchService.trim().length >= 3) {
        onSearch(searchService);
      } else if (searchService.trim().length === 0) {
        onSearch("");
      }
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [searchService, onSearch]);

  const handleChange = (e) => setSearchService(e.target.value);

  return (
    <div className="relative w-full">
      <input
        type="text"
        id="search"
        placeholder="Buscar servicios"
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-10"
        value={searchService}
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <BiSearch className="w-5 h-5 text-gray-500" aria-hidden="true" />
      </div>
    </div>
  );
};

export default SearchService;
