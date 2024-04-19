import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
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
  font-size: 32px;
  font-weight: bolder;
`;

export const DocumentButton = styled(Link)`
  width: 180px;
  text-align: center;
  font-size: 26px;
  color: white;
  background-color: #646464;
  &:hover {
    color: white;
    background-color: #353535;
  }
`;
