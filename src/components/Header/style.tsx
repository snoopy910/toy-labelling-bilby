import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  margin-right: 25%;
  margin-left: 25%;
  z-index: 100;

  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
`;

export const Title = styled(Link)`
  padding: 0 1rem;
  font-size: 32px;
  color: black;
  &:hover {
    color: grey;
  }
`;

export const DocumentButton = styled(Link)`
  padding: 0 1rem;
  text-align: center;
  font-size: 32px;
  color: black;
  &:hover {
    color: grey;
  }
`;
