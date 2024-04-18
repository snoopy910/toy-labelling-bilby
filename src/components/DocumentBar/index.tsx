import React from "react";
import { Container, ID, Title, Labels } from "./style";

interface DocumentBarPropsType {
  id: number;
  title: string;
  labels?: string[];
}

export const DocumentBar: React.FC<DocumentBarPropsType> = ({
  id,
  title,
  labels,
}) => {
  return (
    <Container>
      <ID>{id}</ID>
      <Title>{title}</Title>
      {labels?.length ? <Labels>{labels}</Labels> : <></>}
    </Container>
  );
};
