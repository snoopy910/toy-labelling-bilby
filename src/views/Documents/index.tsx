import React, { useContext } from "react";
import { Container } from "./style";
import { DocumentBar, Loader } from "../../components";
import { DocumentsContext } from "../../contexts";

export const DocumentsView: React.FC = () => {
  const { documents, loading, fetchDocuments } = useContext(DocumentsContext);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const e = event.currentTarget;
    if (e.scrollHeight - e.scrollTop === e.clientHeight) {
      fetchDocuments(documents.length);
    }
  };

  return (
    <Container onScroll={handleScroll}>
      {documents.map((document, index) => {
        return <DocumentBar key={index} document={document} />;
      })}
      {loading ? <Loader /> : <></>}
    </Container>
  );
};
