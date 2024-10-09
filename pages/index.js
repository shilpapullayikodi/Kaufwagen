import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card";
import SearchForm from "@/components/SearchForm";
import { useState } from "react";
import { useSession } from "next-auth/react";

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

// Full-screen overlay for loading spinner
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Make sure it covers the entire UI */
`;

// Loader spinner
const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg); // (spin) rotate 360
    }
  }
`;
const Message = styled.div`
  text-align: center;
  font-size: 1.5em;
  color: #28a745;
  margin-top: 50px;
  font-weight: bold;
  padding: 20px;
  background-color: #f2f2f3;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

export default function Home() {
  const categories = [
    "Fruits & Vegetables",
    "Bread & Baked Goods",
    "Grain Products",
    "Household",
    "Eggs & Diary",
    "Personal Care",
    "Sweets & Snacks",
    "Beverages",
  ];
  const [query, setQuery] = useState(""); // State to store the input value
  const { data, error, mutate: mutateItems } = useSWR("/api/items");
  const [loading, setLoading] = useState(false); // Add loading state
  const { data: session } = useSession();
  const [selectedExpandedCategory, setSelectedExpandedCategory] = useState("");

  if (!session) {
    return (
      <>
        <Message>Please log in before accessing your shopping list! 🛍️</Message>
      </>
    );
  }
  if (!data && !error) {
    return (
      <Overlay>
        <Loader />
      </Overlay>
    );
  }

  if (error) return <h1>Error loading items</h1>;

  //separating items and selected items into different variable
  const { items = [], selectedItems = [] } = data;

  async function toggleFavourite(id) {
    setLoading(true);

    const response = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    if (response.ok) {
      await response.json();
      // Re-fetch the data after successful POST request
      await mutateItems();
    } else {
      console.error("Failed to toggle favourite");
    }

    setLoading(false); // API call completes
  }

  const groupedItems = {};
  items.forEach((item) => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = [];
    }
    groupedItems[item.category].push(item);
  });

  console.log(groupedItems);

  // Filter items based on the query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      {/* Loading overlay */}
      {loading && (
        <Overlay>
          <Loader />
        </Overlay>
      )}

      <div>
        <SearchForm query={query} setQuery={setQuery} />

        {query && (
          <ClearButton onClick={() => setQuery("")}>Clear Search</ClearButton>
        )}

        <List>
          {!query &&
            selectedItems.map((item) => {
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
        {query &&
          filteredItems.map((item) => {
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

      <List>
        {!query &&
          categories.map((category) => {
            return (
              <>
                <h4>{category}</h4>
                {groupedItems[category].map((item) => (
                  <ListItem key={item._id}>
                    <Card
                      id={item._id}
                      name={item.name}
                      image={item.image}
                      onClick={toggleFavourite}
                      isSelected={selectedItems.find(
                        (selectedItem) => selectedItem._id === item._id
                      )}
                    />
                  </ListItem>
                ))}
              </>
            );
          })}
      </List>
    </>
  );
}
