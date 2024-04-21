import React from "react";
import { Container, Title, GoToDocument } from "./style";

export const HeaderComponent: React.FC = () => {
  return (
    <Container>
      <Title to={"/"}>Bilby</Title>
      <GoToDocument to={"/documents"}>Documents</GoToDocument>
    </Container>
  );
};
