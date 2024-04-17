import React from "react";
import { Container, Content, Title, Desc } from "./style";

export const HomeView: React.FC = () => {
  return (
    <Container>
      <Content>
        <Title>Toy Document Labeling</Title>
        <Desc>
          Tool that enables humans to create training sets for NLP-based machine
          learning models
        </Desc>
      </Content>
    </Container>
  );
};
