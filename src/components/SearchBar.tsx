import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-4 py-3 pl-10 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent shadow-sm"
        />
        <Search className="absolute left-3 text-gray-400" size={18} />
        <button
          type="submit"
          className="absolute right-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full p-2 transition-colors duration-200"
        >
          <Search size={18} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;