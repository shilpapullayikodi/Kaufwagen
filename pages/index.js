import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card";

const List = styled.ul`
  list-style: none;
  display: grid;
  gap: 10px; //1rem
  padding-left: 0;
  grid-template-columns: repeat(
    auto-fit,
    minmax(100px, 1fr)
  ); //dynamically change the no.of columns
`;
const ListItem = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export default function Home() {
  //const [selectedItems, setSelectedItems] = useState([]); // To be replaced with api call to get list of all selected Item

  const { data, error, mutate: mutateItems } = useSWR("/api/items");

  if (!data && !error) {
    return <h1>Loading...</h1>;
  }
  if (error) return <h1>Error loading items</h1>;
  //separating items and selected items into different variable
  const { items = [], selectedItems = [] } = data;

  async function toggleFavourite(id) {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    if (response.ok) {
      await response.json();
      // Re-fetch the data after successful POST request
      mutateItems(); // This will trigger a re-fetch of the data from "/api/items"
    } else {
      console.error("Failed to toggle favourite");
    }
  }

  return (
    <>
      <div>
        <List>
          {selectedItems.map((item) => {
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
        {items.map((item) => {
          return (
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
          );
        })}
      </List>
    </>
  );
}
