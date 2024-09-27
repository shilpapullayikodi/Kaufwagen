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
`;
export default function Card({ id, name, image }) {
  return (
    <>
      <Article>
        <Figure>
          <ImageContainer>
            <StyledImage src={image} alt={name} />
          </ImageContainer>
          <figcaption>{name}</figcaption>
        </Figure>
      </Article>
    </>
  );
}
