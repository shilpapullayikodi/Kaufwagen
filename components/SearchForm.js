import { useState } from "react";
import useSWR from "swr";

export default function SearchForm({ query, setQuery }) {
  // Handle input change and call the search function
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Update the query state
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Search item..."
        value={query}
        onChange={handleInputChange} // Trigger onChange event when user types
        style={{
          padding: "8px",
          fontSize: "16px",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </form>
  );
}
