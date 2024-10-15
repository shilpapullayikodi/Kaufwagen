import styled from "styled-components";

const Article = styled.article`
  padding: 0.2rem;
  box-shadow: 10px 5px 5px #2e3c41;
  width: 6rem;
`;
const Figure = styled.figure`
  position: relative;
  margin: 0;
  padding-left: 0.2em;
  background-color: var(--color-card-green);

  &.isSelected {
    background-color: var(--color-card-red);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  width: 100%;
  height: auto;
  max-height: 100%;
  max-width: 100%; //prevent overflow
  background-color: #a6b37d;

  &.isSelected {
    background-color: #ed9898;
  }
`;
const CharImage = styled.span`
  font-size: 4em;
  font-family: emoji;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;

export default function Card({
  id,
  name,
  image,
  onClick,
  isSelected,
  loading,
}) {
  return (
    <>
      <Article onClick={() => onClick(id == 0 ? name : id)}>
        {/* if id is 0, onClick function will be AddNew else it will be toggleFavourite. For toggleFavourite pass id, else name to create new item  */}
        <Figure className={isSelected ? "isSelected" : ""}>
          <ImageContainer>
            {image ? (
              <StyledImage
                src={image}
                alt={name}
                className={isSelected ? "isSelected" : ""}
              />
            ) : (
              <CharImage>{name.charAt(0).toUpperCase()}</CharImage>
            )}
          </ImageContainer>
          <figcaption>{name}</figcaption>
        </Figure>
      </Article>
    </>
  );
}
