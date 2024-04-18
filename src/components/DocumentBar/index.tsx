import React from "react";
import { Container, ID, Title, Labels } from "./style";

interface DocumentBarPropsType {
  id: number;
  title: string;
  labels?: string[];
  onClick: () => void;
}

export const DocumentBar: React.FC<DocumentBarPropsType> = ({
  id,
  title,
  labels,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <ID>{id + 1}</ID>
      <Title>{title}</Title>
      {labels?.length ? <Labels>{labels}</Labels> : <></>}
    </Container>
  );
};
