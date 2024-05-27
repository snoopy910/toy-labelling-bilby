import React from "react";
import { IDocument, PATH } from "consts";
import { Container, IDNumber, Title } from "./style";

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
