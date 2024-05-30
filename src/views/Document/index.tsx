import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ControlBar, LabelBar, Loader } from "components";
import { IDocument } from "consts";
import { DocumentsContext } from "contexts";
import { useFetchDocumentWithQuery } from "hooks";
import { Screen, Container, Title, Body, GoToArticle } from "./style";

type PathParams = {
  id: string;
};

const DefaultDocument: IDocument = {
  id: 0,
  title: "",
  body: "",
  url: "",
};

export const DocumentView: React.FC = () => {
  const [document, setDocument] = useState<IDocument>(DefaultDocument);
  const [labels, setLabels] = useState<string[] | undefined>([]);

  const { id } = useParams<PathParams>();
  const { updateCurrentId } = useContext(DocumentsContext);
  const { data, isLoading, error } = useFetchDocumentWithQuery(
    parseInt(id ?? "")
  );

  useEffect(() => {
    if (data) {
      setDocument(data);
      setLabels(data.label);
      updateCurrentId(parseInt(id ?? ""));
    }
  }, [data]);

  const handleReset = () => {
    setLabels(data.label);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !error ? (
        <Screen>
          <Container>
            <Title>{`${document.id + 1} ${document.title}`}</Title>
            <Body>{document.body}</Body>
            <GoToArticle>
              <a href={document.url} target="_blank">
                Go To Article -&gt;
              </a>
            </GoToArticle>
            <LabelBar labels={labels} setLabels={setLabels} />
            <ControlBar
              labels={labels}
              document={document}
              setDocument={setDocument}
              handleReset={handleReset}
            />
          </Container>
        </Screen>
      ) : (
        <p>{error.message}</p>
      )}
    </>
  );
};
