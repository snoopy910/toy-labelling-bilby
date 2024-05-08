import styled from "styled-components";
import aaa from "assets/background.jpg";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${aaa});
  background-size: cover;
  height: 100%;
  padding: 0px 200px;
`;
