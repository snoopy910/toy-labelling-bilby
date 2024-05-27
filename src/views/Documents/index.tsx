import React, { useContext } from "react";
import { DocumentBar, Loader } from "components";
import { NUMBER_TO_FETCH } from "consts";
import { DocumentsContext } from "contexts";
import { Container } from "./style";

export const DocumentsView: React.FC = () => {
  const { id, documents, isLoading, setId } = useContext(DocumentsContext);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const e = event.currentTarget;
    if (e.scrollHeight - e.scrollTop === e.clientHeight) {
      const newId = id + NUMBER_TO_FETCH;
      setId(newId);
    }
  };

  return (
    <Container onScroll={handleScroll}>
      {documents.map((document, index) => {
        return <DocumentBar key={index} document={document} />;
      })}
      {isLoading ? <Loader /> : <></>}
    </Container>
  );
};
