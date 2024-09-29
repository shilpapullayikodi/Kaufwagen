import useSWR from "swr";
import styled from "styled-components";
import Card from "@/components/Card";

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
