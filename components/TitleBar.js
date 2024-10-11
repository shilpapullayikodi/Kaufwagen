import styled from "styled-components";

const Headline = styled.h1`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 15px;
  text-align: center;
  z-index: 1; //stacking order
  background: black;
  color: white;
`;

export default function TitleBar() {
  return <Headline>Kaufwagen🛒</Headline>;
}
