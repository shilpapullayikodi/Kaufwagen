import styled from "styled-components";

const Article = styled.article`
  border: 1px solid lightgrey;
  padding: 0.2rem;
  box-shadow: 10px 5px 5px gainsboro;
  width: 6rem;
`;
const Figure = styled.figure`
  position: relative;
  margin: 0;
  background-color: #a6b37d;

  &.isSelected {
    background-color: #ed9898;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 5rem;
  display: flex;
  align-items: center; // align items vertically center
  justify-content: center; // align items vertically center
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  width: 100%; //responsive
  height: auto;
  max-height: 100%;
  max-width: 100%; //prevent overflow
  background-color: #a6b37d;

  &.isSelected {
    background-color: #ed9898;
  }
`;

const Button = styled.button``;
export default function Card({ id, name, image, onClick, isSelected }) {
  return (
    <>
      <Article onClick={() => onClick(id)}>
        <Figure className={isSelected ? "isSelected" : ""}>
          <ImageContainer>
            <StyledImage
              src={image}
              alt={name}
              className={isSelected ? "isSelected" : ""}
            />
          </ImageContainer>
          <figcaption>{name}</figcaption>
        </Figure>
      </Article>
    </>
  );
}
