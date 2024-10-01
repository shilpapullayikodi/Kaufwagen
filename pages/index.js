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

  const { data, error } = useSWR("/api/items");
  const {
    newData,
    error: selectedItemsError,
    mutate,
  } = useSWR("/api/items/selectedItem");

  if (!data && !error) {
    return <h1>Loading...</h1>;
  }
  if (error || selectedItemsError) return <h1>Error loading items</h1>;

  async function toggleFavourite(id) {
    const response = await fetch("/api/items/selectedItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });
    if (response.ok) {
      await mutate(); // Update the cache for selected items
    }
  }
  //filter from data if id of the selcteditem is available in db, only filter those items)
  const filteredItems = data.filter((item) =>
    newData?.find((selectedItem) => selectedItem.item === item._id)
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
