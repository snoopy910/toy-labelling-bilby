import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled(Link)`
  display: flex;
  height: fit-content;
  width: 80%;
  margin: auto;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  align-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid grey;
  border-radius: 10px;
  cursor: pointer;
`;

export const Title = styled.div`
  font-size: 20px;
  margin-right: auto;
  align-content: center;
`;

export const IDNumber = styled.div`
  font-size: 24px;
  font-weight: bolder;
  margin-right: 10px;
  align-content: center;
`;

export const Labels = styled.div`
  font-size: 18px;
`;
