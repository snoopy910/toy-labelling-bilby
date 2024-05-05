import React from "react";
import { Container, Content, Title, Description } from "./style";

export const HomeView: React.FC = () => {
  return (
    <Container>
      <Content>
        <Title>Toy Document Labeling</Title>
        <Description>
          Tool that enables humans to create training sets for NLP-based machine
          learning models
        </Description>
      </Content>
    </Container>
  );
};
