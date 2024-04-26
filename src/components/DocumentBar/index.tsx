import React from "react";
import { Container, IDNumber, Title } from "./style";
import { DOCUMENTS } from "../../consts";

interface DocumentBarPropsType {
  ID: number;
  title: string;
}

export const DocumentBar: React.FC<DocumentBarPropsType> = ({ ID, title }) => {
  return (
    <Container to={DOCUMENTS + "/" + ID}>
      <IDNumber>{ID + 1}</IDNumber>
      <Title>{title}</Title>
    </Container>
  );
};
