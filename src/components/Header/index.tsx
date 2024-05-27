import React from "react";
import { PATH } from "consts";
import { Container, Title, GoToDocument } from "./style";

export const HeaderComponent: React.FC = () => {
  return (
    <Container>
      <Title to={PATH.HOME}>Bilby</Title>
      <GoToDocument to={PATH.DOCUMENTS}>Documents</GoToDocument>
    </Container>
  );
};
