import styled from "styled-components";
import Card from "@/components/Card";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-left: 0;
`;

const ListItem = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
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

export default function ListCategories({
  query,
  toggleSelect,
  categories,
  selectedCategory,
  groupedItems,
  toggleFavourite,
  selectedItems,
}) {
  return (
    !query &&
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
    })
  );
}
