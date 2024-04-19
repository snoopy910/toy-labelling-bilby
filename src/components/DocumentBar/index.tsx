import React from "react";
import { Container, IDNumber, Title } from "./style";

interface DocumentBarPropsType {
  ID: number;
  title: string;
  onClick: () => void;
}

export const DocumentBar: React.FC<DocumentBarPropsType> = ({
  ID,
  title,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <IDNumber>{ID + 1}</IDNumber>
      <Title>{title}</Title>
    </Container>
  );
};
