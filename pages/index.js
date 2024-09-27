import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row; /* Changed to row */
  align-items: center;
  gap: 0.5rem;
  padding-left: 0;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  position: relative;
  width: 30%;
`;

export default function Home() {
  const { data, error } = useSWR("/api/items");

  if (!data && !error) {
    return <h1>Loading...</h1>;
  }
  if (!data) {
    return null; // Or a fallback UI
  }

  console.log(data);

  return (
    <>
      <List>
        {data.map((item) => {
          return (
            <ListItem key={item.id}>
              <Card name={item.name} image={item.image} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
