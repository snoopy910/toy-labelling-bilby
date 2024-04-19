import React from "react";
import { Container, ID, Title } from "./style";

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
      <ID>{id + 1}</ID>
      <Title>{title}</Title>
    </Container>
  );
};
