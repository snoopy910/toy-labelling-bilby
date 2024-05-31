import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ControlBar, LabelBar, Loader } from "components";
import { IDocument } from "consts";
import { useFetchCountOfDocuments, useFetchDocumentWithQuery } from "hooks";
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
  const [count, setCount] = useState(0);
  const [labels, setLabels] = useState<string[] | undefined>([]);

  const { id } = useParams<PathParams>();
  const { data: dataCount, isLoading: isLoadingCount } =
    useFetchCountOfDocuments();
  const {
    data: dataDocument,
    isLoading: isLoadingDocument,
    error: errorDocument,
  } = useFetchDocumentWithQuery(parseInt(id ?? ""));

  useEffect(() => {
    if (dataDocument) {
      setDocument(dataDocument);
      setLabels(dataDocument.label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDocument]);

  useEffect(() => {
    if (dataCount !== undefined) {
      setCount(dataCount.count);
    }
  }, [dataCount]);

  const handleReset = () => {
    setLabels(dataDocument.label);
  };

  return (
    <>
      {isLoadingDocument || isLoadingCount ? (
        <Loader />
      ) : !errorDocument ? (
        <Screen>
          <Container>
            <Title>{`${document.id + 1}/${count} ${document.title}`}</Title>
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
              length={count}
              setDocument={setDocument}
              handleReset={handleReset}
            />
          </Container>
        </Screen>
      ) : (
        <p>{errorDocument.message}</p>
      )}
    </>
  );
};
