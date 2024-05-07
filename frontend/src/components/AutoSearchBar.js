import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import '../css/searchbar.css'

function SearchBar({ onSearchSelected }) {

    // set ingredients list to search from here, can also be fed into this component from outside
    // tutorial used here: https://www.dhiwise.com/post/how-to-build-react-search-bar-with-suggestions
    // much of it is very similar
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Beef'
        },
        {
            id: 2,
            name: 'Tomatoes'
        },
        {
            id: 3,
            name: 'Potatoes'
        },
        {
            id: 4,
            name: 'Onions'
        }
    ]);

  const handleOnSearch = (string, results) => {
    // Triggered when the user types in the search input
    console.log(string, results);
  };

  const handleOnHover = (item) => {
    // Triggered when the user hovers over an item in the suggestions list
    console.log('Item hovered:', item);
  };

  const handleOnSelect = (item) => {
    // Triggered when the user selects an item from the suggestions list
    console.log('Item selected:', item);
    onSearchSelected(item);
  };

  return (
    <div className="search-bar-container">
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
      />
    </div>
  );
}

export default SearchBar;
