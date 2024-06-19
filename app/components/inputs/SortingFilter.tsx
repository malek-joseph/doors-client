/** @format */

type SortOption = 'featured' | 'price_asc' | 'price_desc';


interface SortingFilterProps {
  onSortChange: (option: SortOption) => void;
}

const SortingFilter = ({ onSortChange }: SortingFilterProps) => {
  return (
    <select
      className="px-4 py-2 border border-gray-300 rounded bg-white cursor-pointer"
      onChange={e => onSortChange(e.target.value as SortOption)}
    >
      <option value="featured">Featured First</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
    </select>
  );
};

export default SortingFilter;
