import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SelectedItem from "@/components/SelectedItem";
//import SearchForm from "@/components/SearchForm";
import SearchItem from "@/components/SearchItem";
import ListCategories from "@/components/ListCategories";

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
const MessageText = styled.div`
  font-style: italic;
  color: gray;
  font-size: 1.5em;
  width: 100%;
  white-space: nowrap;
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

      <SelectedItem
        query={query}
        selectedItems={selectedItems}
        toggleFavourite={toggleFavourite}
      />

      <SearchItem
        query={query}
        setQuery={setQuery}
        filteredItems={filteredItems}
        toggleFavourite={toggleFavourite}
        addNew={addNew}
        selectedItems={selectedItems}
      />

      <ListCategories
        query={query}
        groupedItems={groupedItems}
        selectedCategory={selectedCategory}
        categories={categories}
        toggleSelect={toggleSelect}
        toggleFavourite={toggleFavourite}
        selectedItems={selectedItems}
      />
    </>
  );
}
