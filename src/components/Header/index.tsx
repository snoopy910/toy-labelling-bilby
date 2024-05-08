import React from "react";
import { Container, Title, GoToDocument } from "./style";
import { PATH } from "consts";

export const HeaderComponent: React.FC = () => {
  return (
    <Container>
      <Title to={PATH.HOME}>Bilby</Title>
      <GoToDocument to={PATH.DOCUMENTS}>Documents</GoToDocument>
    </Container>
  );
};
