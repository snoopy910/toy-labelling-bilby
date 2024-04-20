import React from "react";
import { Container } from "./style";
import { DocumentView } from "../../views/Document";
import { Sidebar } from "../../views/Sidebar";

export const DocumentPage: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <DocumentView />
    </Container>
  );
};
