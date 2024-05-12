import React, { useContext } from "react";
import { Container } from "./style";
import { DocumentBar, Loader } from "components";
import { DocumentsContext } from "../../contexts";

interface DocumentsViewProps {
  setId: React.Dispatch<React.SetStateAction<number>>;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ setId }) => {
  const { documents, isLoading } = useContext(DocumentsContext);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const e = event.currentTarget;
    if (e.scrollHeight - e.scrollTop === e.clientHeight) {
      setId((prevId) => prevId + 20);
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
