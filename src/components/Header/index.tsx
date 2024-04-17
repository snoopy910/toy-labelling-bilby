import React from "react";
import { Container, Title, DocumentButton } from "./style";

export const HeaderComponent: React.FC = () => {
  return (
    <Container>
      <Title to={"/"}>Bilby</Title>
      <DocumentButton to={"/documents"}>Documents</DocumentButton>
    </Container>
  );
};
