import React from "react";
import { Container, IDNumber, Title } from "./style";
import { IDocument, PATH } from "consts";

interface DocumentBarPropsType {
  document: IDocument;
}

export const DocumentBar: React.FC<DocumentBarPropsType> = ({ document }) => {
  return (
    <Container to={`${PATH.DOCUMENTS}/${document.id}`}>
      <IDNumber>{document.id + 1}</IDNumber>
      <Title>{document.title}</Title>
    </Container>
  );
};
