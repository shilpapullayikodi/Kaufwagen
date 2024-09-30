import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card";
import { useState } from "react";

const List = styled.ul`
  list-style: none;
  display: grid;
  gap: 1rem;
  padding-left: 0;
  grid-template-columns: repeat(
    auto-fit,
    minmax(150px, 1fr)
  ); //dynamically change the no.of columns
`;
const ListItem = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
`;

export default function Home() {
  const [selectedItems, setSelectedItems] = useState([]);

  const { data, error } = useSWR("/api/items");

  if (!data && !error) {
    return <h1>Loading...</h1>;
  }
  if (!data) {
    return null;
  }

  function toggleFavourite(id) {
    console.log("called" + id);
    //before adding find which all items selected check selectedItems array
    const result = selectedItems.find((item) => item.id === id);

    //  item is not present return undefined
    if (result) {
      // remove from selectedItems
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item.id !== id)
      );
    }
    if (result === undefined) {
      // add item (id) to the selectedItems array
      const newSelectedItems = { id: id };
      //creating a new array
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        newSelectedItems,
      ]);
    }
  }
  //filter from data in db that if id in the selcted item is available in db, only filter those)
  const filteredItems = data.filter((item) =>
    selectedItems.find((selectedItem) => selectedItem.id == item._id)
  );

  console.log(filteredItems);

  return (
    <>
      <div>
        <List>
          {filteredItems.map((item) => {
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
      </div>
      <hr />

      <List>
        {data.map((item) => {
          return (
            <ListItem key={item._id}>
              <Card
                id={item._id}
                name={item.name}
                image={item.image}
                onClick={toggleFavourite}
                isSelected={filteredItems.find(
                  (filteredItem) => filteredItem._id == item._id
                )}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
