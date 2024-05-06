import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Screen, Container, Title, Body, GoToArticle } from "./style";
import { ControlBar, LabelBar } from "../../components";
import { PATH, IDocument } from "../../consts";
import { DocumentsContext } from "../../contexts";

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
  const { id } = useParams<PathParams>();

  const { documents } = useContext(DocumentsContext);
  const [document, setDocument] = useState<IDocument>(DefaultDocument);

  const [labels, setLabels] = useState<string[] | undefined>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (documents.length === 0) navigate(PATH.DOCUMENTS);
  }, [documents, navigate]);

  useEffect(() => {
    if (id) {
      setDocument(documents[parseInt(id)]);
    }
  }, [id, documents]);

  useEffect(() => {
    setLabels(document.label);
  }, [document]);

  const handleReset = (id: number) => {
    setLabels(documents[id].label);
  };

  return (
    <Screen>
      <Container>
        <Title>{document.title}</Title>
        <Body>{document.body}</Body>
        <GoToArticle>
          <a href={document.url} target="_blank">
            Go To Article -&gt;
          </a>
        </GoToArticle>
        <LabelBar labels={labels} setLabels={setLabels} />
        <ControlBar labels={labels} handleReset={handleReset} />
      </Container>
    </Screen>
  );
};
