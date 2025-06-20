// src/components/SearchInput.tsx
import React, { useState } from 'react';

interface SearchInputProps {
    onSearch: (searchTerm: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder = 'Search...', className }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(searchTerm);
        }
    };

    const handleSearchClick = () => {
        onSearch(searchTerm);
    };

    return (
        <div className={`relative flex items-center ${className}`}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-grow p-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <button
                onClick={handleSearchClick}
                className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-blue-600 transition duration-200"
                aria-label="Search"
            >
                {/* Simple search icon (you might want to use an SVG icon library like Heroicons for better visuals) */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SearchInput;