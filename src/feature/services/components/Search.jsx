  import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
  import React, { useState } from 'react';


  const SearchService =  ({ onSearch }) =>{
      const [searchService, setSearchService] = useState('');

      const handleChange = (e) => {
        setSearchService(e.target.value);
        }
        const handleSearchClick = (e) => {
          e.preventDefault();
          onSearch(searchService); 
        };

      return (
          <div className="relative w-full md:w-64 mb-4"> 
            <label htmlFor="search" className="sr-only">Buscar</label>
            <input
              type="text"
              id="search"
              placeholder="Buscar servicios"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={searchService}
              onChange={handleChange}
            />
            
              <button onClick={handleSearchClick}  className="absolute inset-y-0 right-0 flex items-center pr-3">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              </button>
           
          </div>
        );
      };


  export default SearchService