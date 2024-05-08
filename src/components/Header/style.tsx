import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
  padding: 20px;
`;

export const Title = styled(Link)`
  font-size: 32px;
  color: black;
  &:hover {
    color: grey;
  }
`;

export const GoToDocument = styled(Link)`
  font-size: 32px;
  color: black;
  &:hover {
    color: grey;
  }
`;
