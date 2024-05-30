/** @format */

import React, { useState } from "react";

type SearchAndFiltersProps = {
  onSearch: (searchTerm: string) => void;
  onFilter: (filterOptions: FilterOptions) => void;
};

type FilterOptions = {
  listingType: string | null;
  roommatePreference: string | null;
  rentRange: number[];
  internet: boolean | null;
  city: string | null;
  governance: string | null;
};

const SearchAndFiltersBar: React.FC<SearchAndFiltersProps> = ({
  onSearch,
  onFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<FilterOptions>({
    listingType: null,
    roommatePreference: null,
    rentRange: [500, 10000], // Min and Max rent range
    internet: null,
    city: null,
    governance: null,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Notify parent component of search term change
  };
  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (event.target as HTMLInputElement).checked : false;
    if (type === "checkbox") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: checked,
      }));
    } else if (name === "rentRange") {
      // Adjust the rent range
      const rentRange = [...filters.rentRange];
      rentRange[1] = parseInt(value);
      setFilters((prevFilters) => ({
        ...prevFilters,
        rentRange,
      }));
      // Pass the updated filters to the parent component
      onFilter({
        ...filters,
        rentRange,
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value === "null" ? null : value,
      }));
      // Pass the updated filters to the parent component
      onFilter({
        ...filters,
        [name]: value === "null" ? null : value,
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4 shadow-md rounded-lg p-4 bg-teal-50">
      <div className="w-full md:w-48 ">
        <select
          name="listingType"
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
          <option value="null">Listing Type</option>
          <option value="place">Place</option>
          <option value="person">Person</option>
        </select>
        <select
          name="roommatePreference"
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border mt-3 border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
          <option value="null">Gender</option>
          <option value="Men only">Male</option>
          <option value="Women only">Female</option>
          <option value="Any">Any</option>
        </select>
      </div>

      <div className="w-full md:w-48 mt-4 md:mt-0">
        <input
          type="text"
          name="governance"
          onChange={handleFilterChange}
          placeholder="Governance"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border border-gray-300 mt-3 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="w-full md:w-48 mt-4 md:mt-0">
        <label className="block font-medium">Rent Range:</label>

        <input
          type="range"
          name="rentRange"
          min="500"
          max="10000"
          step="100"
          value={filters.rentRange[1]}
          onChange={handleFilterChange}
          className="w-full  py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
        />
        <span>
          Between {filters.rentRange[0]} and {filters.rentRange[1]}
        </span>
      </div>

      {/* <div className="w-full md:w-48 mt-4 md:mt-0">
        <label className="block font-medium">Internet:</label>
        <input
          type="checkbox"
          name="internet"
          checked={filters.internet || false}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div> */}

      {/* <div className="w-full md:w-96 mt-4 md:mt-0">
        <input
          type="text"
          placeholder="Search by city, governance, accommodation type..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div> */}
    </div>
  );
};

export default SearchAndFiltersBar;
