import React, { useContext } from "react";
import { Container } from "./style";
import { DocumentBar } from "../../components/DocumentBar";
import { DocumentsContext } from "../../contexts";

export const DocumentView: React.FC = () => {
  const { documents } = useContext(DocumentsContext);
  return (
    <Container>
      {documents.map((document) => (
        <DocumentBar
          id={document.ID}
          title={document.title}
          labels={document.label}
        />
      ))}
    </Container>
  );
};
