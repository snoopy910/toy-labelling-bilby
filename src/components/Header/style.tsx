import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;

  position: fixed;
  top: 40px;
  left: 0px;
  right: 0px;
`;

export const Title = styled(Link)`
  font-size: 32px;
  color: black;
  &:hover {
    color: grey;
  }
`;

export const GoToDocument = styled(Link)`
  text-align: center;
  font-size: 32px;
  color: black;
  &:hover {
    color: grey;
  }
`;
