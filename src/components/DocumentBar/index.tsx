import React from "react";
import { Container, IDNumber, Title } from "./style";
import { PATH } from "../../consts";

interface DocumentBarPropsType {
  id: number;
  title: string;
}

export const DocumentBar: React.FC<DocumentBarPropsType> = ({ id, title }) => {
  return (
    <Container to={PATH.DOCUMENTS + "/" + id}>
      <IDNumber>{id + 1}</IDNumber>
      <Title>{title}</Title>
    </Container>
  );
};
