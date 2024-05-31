import React, { useState, useEffect } from 'react';

interface ISearchBarProps {
    onSubmit: (searchTerm: string) => void;
}

const SearchBar = ({ onSubmit }: ISearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSubmit(searchTerm);
        }, 1000);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <div className="search-bar">
                <input
                    type="text"
                    name="searchBar"
                    placeholder='Search for a character...'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

        </div>
    );
};

export default SearchBar;
