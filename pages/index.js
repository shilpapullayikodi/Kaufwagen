import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card";
import { useState } from "react";

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

export default function Home() {
  const { data, error, mutate: mutateItems } = useSWR("/api/items");
  const [loading, setLoading] = useState(false); // Add loading state

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
      await mutateItems(); // This will trigger a re-fetch of the data from "/api/items"
    } else {
      console.error("Failed to toggle favourite");
    }

    setLoading(false); // Stop loader after API call completes
  }

  return (
    <>
      {/* Loading overlay */}
      {loading && (
        <Overlay>
          <Loader />
        </Overlay>
      )}

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
