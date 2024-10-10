import styled from "styled-components";

const SearchBar = styled.input`
  width: 100%;
  background-color: #253036;
  color: #f4f4f4;
  border: 1px solid #253036;
  border-radius: 4px;
  padding: 12px;
  font-size: 18px;
`;

export default function SearchForm({ query, setQuery }) {
  const handleInputChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setQuery(value); // Update the query state
  };

  return (
    <form>
      <SearchBar
        type="text"
        placeholder="Search item..."
        autoFocus
        value={query}
        onChange={handleInputChange}
      />
    </form>
  );
}
