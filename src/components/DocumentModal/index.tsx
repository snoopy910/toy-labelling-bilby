import React from "react";
import {
  Screen,
  Container,
  Title,
  Body,
  LabelContainer,
  Label,
  LabelInput,
  LabelBox,
  GoToArticle,
  ControlBar,
  MoveController,
  First,
  Prev,
  Next,
  Last,
  SaveReset,
  SaveButton,
  ResetButton,
  CloseButton,
} from "./style";
import { IDocument } from "../../consts/documents";

interface DocumentModalPropsType {
  document: IDocument;
  isOpen: boolean;
  onClose: () => void;
  onFirst: () => void;
  onLast: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const DocumentModal: React.FC<DocumentModalPropsType> = ({
  document,
  isOpen,
  onClose,
  onFirst,
  onLast,
  onPrev,
  onNext,
}) => {
  if (!isOpen) return null;

  return (
    <Screen>
      <Container>
        <Title>{document.title}</Title>
        <Body>{document.body}</Body>
        <GoToArticle>
          <a href={document.URL} target="_blank">
            Go To Article -&gt;
          </a>
        </GoToArticle>
        <LabelContainer>
          <Label>Label</Label>
          <LabelInput>input</LabelInput>
          <LabelBox>{document.label}</LabelBox>
        </LabelContainer>
        <ControlBar>
          <MoveController>
            <First onClick={onFirst}>&lt;&lt;</First>
            <Prev onClick={onPrev}>&lt;</Prev>
            <Next onClick={onNext}>&gt;</Next>
            <Last onClick={onLast}>&gt;&gt;</Last>
          </MoveController>
          <SaveReset>
            <SaveButton>Save</SaveButton>
            <ResetButton>Reset</ResetButton>
            <CloseButton onClick={onClose}>Close</CloseButton>
          </SaveReset>
        </ControlBar>
      </Container>
    </Screen>
  );
};
