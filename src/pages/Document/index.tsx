import React from "react";
import { DocumentView } from "../../views/Document";
import { Sidebar } from "../../views/Sidebar";
import { Container } from "./style";

export const DocumentPage: React.FC = () => {
  return (
    <Container>
      <Sidebar />
      <DocumentView />
    </Container>
  );
};
