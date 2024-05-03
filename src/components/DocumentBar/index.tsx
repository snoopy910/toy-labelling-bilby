import React from "react";
import { Container, IDNumber, Title } from "./style";

interface DocumentBarPropsType {
  id: number;
  title: string;
  onClick: () => void;
}

export const DocumentBar: React.FC<DocumentBarPropsType> = ({
  id,
  title,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <IDNumber>{id + 1}</IDNumber>
      <Title>{title}</Title>
    </Container>
  );
};
