import { useState } from "react";
import useSWR from "swr";

export default function SearchForm({ query, setQuery }) {
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Update the query state
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Search item..."
        autoFocus
        value={query}
        onChange={handleInputChange}
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
