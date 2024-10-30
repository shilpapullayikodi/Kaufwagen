import styled from "styled-components";
import Card from "@/components/Card";
import SearchForm from "./SearchForm";

const List = styled.ul`
  list-style: none;
  display: grid;
  gap: 10px; //1rem
  padding-left: 0;
  grid-template-columns: repeat(
    auto-fill,
    minmax(100px, 1fr)
  ); //dynamically change the no.of columns
`;
const ListItem = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const ClearButton = styled.button`
  margin: 10px;
  background-color: #a6b37d;
  color: black;
  border: 1px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  padding: 2px;
  font-style: italic;
  &:hover {
    background-color: #d37676;
  }
`;

export default function SearchItem({
  query,
  filteredItems,
  toggleFavourite,
  addNew,
  selectedItems,
  setQuery,
}) {
  return (
    <>
      <div>
        <SearchForm query={query} setQuery={setQuery} />

        {query && (
          <ClearButton onClick={() => setQuery("")}>Clear Search</ClearButton>
        )}

        {query && (
          <List>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ListItem key={item._id}>
                  <Card
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    onClick={toggleFavourite}
                    isSelected={selectedItems.find(
                      (selectedItem) => selectedItem._id == item._id
                    )}
                  />
                </ListItem>
              ))
            ) : (
              <Card id={0} name={query} onClick={addNew} isSelected={false} />
            )}
          </List>
        )}
      </div>
    </>
  );
}
