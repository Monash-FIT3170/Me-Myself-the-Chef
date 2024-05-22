import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import '../css/searchbar.css'

function AllergySearchBar({ onAllergySearch }) {
    const [items, setItem] = useState([
        { name: "Dairy" },
        { name: "Egg" },
        { name: "Gluten" },
        { name: "Lactose" },
        { name: "Grain" },
        { name: "Peanut" },
        { name: "Walnut" },
        { name: "Fructose" },
        { name: "Seafood" },
        { name: "Sesame" },
        { name: "Shellfish" },
        { name: "Soy" },
        { name: "Sulfite" },
        { name: "Tree Nut" },
        { name: "Wheat" }
    ])

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
        console.log('Passing up a level:', item.name);
        onAllergySearch(item.name);
      };
    
      return (
        <div className="search-bar-container">
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            placeholder="Enter allergy or intolerance ... "
            showNoResults={true}
            showNoResultsText='Allergy not supported'
            styling={{zIndex: "999"}}
          />
        </div>
      );
}

export default AllergySearchBar