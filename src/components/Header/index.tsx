import React from "react";
import { Container, Title, GoToDocument } from "./style";
import { HOME, DOCUMENTS } from "../../consts";

export const HeaderComponent: React.FC = () => {
  return (
    <Container>
      <Title to={HOME}>Bilby</Title>
      <GoToDocument to={DOCUMENTS}>Documents</GoToDocument>
    </Container>
  );
};
