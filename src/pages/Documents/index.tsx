import React from "react";
import { Container } from "./style";
import { DocumentView, Sidebar } from "../../views";

export const DocumentPage: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <DocumentView />
    </Container>
  );
};
