import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card";
import SearchForm from "@/components/SearchForm";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

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
  color: rgb(222 222 222);
  margin-top: 50px;
  font-weight: bold;
  padding: 20px;
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

const CategoryContainer = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  padding: 0.5em;
  background-color: var(--color-card-container);
  position: relative;
`;
const CategoryHeader = styled.h4`
  margin: auto;
  padding: 0.5em;
  cursor: pointer;
  color: white;
`;
const CategoryFooter = styled.h4`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: auto;
  cursor: pointer;
  color: white;
`;
const MessageText = styled.div`
  font-style: italic;
  color: gray;
  font-size: 1.5em;
  width: 100%;
  white-space: nowrap;
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

export default function Home() {
  const categories = [
    "Fruits & Vegetables",
    "Bread & Baked Goods",
    "Sweets & Snacks",
    "Eggs & Diary",
    "Meat & Fish",
    "Grain Products",
    "Frozen Foods",
    "Personal Care",
    "Household",
  ];
  const [query, setQuery] = useState("");
  const { data, error, mutate: mutateItems } = useSWR("/api/items");
  const [loading, setLoading] = useState(false); // Add loading state
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState("");
  if (!session) {
    return (
      <>
        <Message>
          Log in with your Github before accessing the shopping list! 🛍️
        </Message>
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

  async function addNew(name) {
    setLoading(true);

    const response = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
      }),
    });

    if (response.ok) {
      await response.json();
      await mutateItems();
    } else {
      console.error("Failed to toggle favourite");
    }

    setLoading(false);
  }

  async function toggleFavourite(id) {
    setLoading(true);

    const response = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });

    if (response.ok) {
      await response.json();
      await mutateItems();
    } else {
      console.error("Failed to toggle favourite");
    }

    setLoading(false);
  }

  const groupedItems = {};
  items.forEach((item) => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = [];
    }
    groupedItems[item.category].push(item);
  });

  console.log(groupedItems);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  function toggleSelect(category) {
    setSelectedCategory(selectedCategory === category ? "" : category);
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
        <SearchForm query={query} setQuery={setQuery} />

        {query && (
          <ClearButton onClick={() => setQuery("")}>Clear Search</ClearButton>
        )}

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

      {!query &&
        categories.map((category) => {
          return (
            <>
              <CategoryContainer key={category}>
                <CategoryHeader onClick={() => toggleSelect(category)}>
                  {category}
                </CategoryHeader>
                {selectedCategory === category && (
                  <List>
                    {groupedItems[category]
                      .slice()
                      .sort((a, b) => {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                        return 0;
                      })
                      .map((item) => (
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
                    <CategoryFooter onClick={() => toggleSelect(category)}>
                      ^
                    </CategoryFooter>
                  </List>
                )}
              </CategoryContainer>
            </>
          );
        })}
    </>
  );
}
