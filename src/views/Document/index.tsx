import React, { useContext } from "react";
import { Container } from "./style";
import { DocumentBar } from "../../components/DocumentBar";
import { DocumentsContext } from "../../contexts";

export const DocumentView: React.FC = () => {
  const { documents, fetchDocuments } = useContext(DocumentsContext);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const e = event.currentTarget;
    if (e.scrollHeight - e.scrollTop === e.clientHeight) {
      fetchDocuments(documents.length);
    }
  };

  return (
    <Container onScroll={handleScroll}>
      {documents.map((document, index) => {
        return (
          <div key={index}>
            <DocumentBar ID={document.ID} title={document.title} />
          </div>
        );
      })}
    </Container>
  );
};
