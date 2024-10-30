import styled from "styled-components";
import Card from "@/components/Card";

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
const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 1em;
  color: gray;
  font-size: 1.5em;
  font-style: italic;
  padding: 20px;
`;

export default function SelectedItem({
  query,
  selectedItems,
  toggleFavourite,
}) {
  return (
    <>
      <div>
        <List>
          {!query &&
            selectedItems
              .slice()
              .sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              })
              .map((item) => {
                return (
                  <ListItem key={item._id}>
                    <Card
                      id={item._id}
                      name={item.name}
                      image={item.image}
                      onClick={toggleFavourite}
                      isSelected={true}
                    />
                  </ListItem>
                );
              })}
        </List>
        {!selectedItems.length && !query && (
          <EmptyMessage>
            Nothing to buy? <br />⇡ Search an item by name or browse the
            categories below. ⇣
          </EmptyMessage>
        )}
      </div>
    </>
  );
}
