import React from "react";
import {
  Screen,
  Container,
  Title,
  Body,
  ControllerContainer,
  SaveButton,
} from "./style";

interface DuplicateModalPropsType {
  onConfirm: () => void;
}

export const DuplicateLabelModal: React.FC<DuplicateModalPropsType> = ({
  onConfirm,
}) => {
  return (
    <Screen>
      <Container>
        <Title>Please Confirm</Title>
        <Body>You have already this label</Body>
        <ControllerContainer>
          <SaveButton onClick={onConfirm}>OK</SaveButton>
        </ControllerContainer>
      </Container>
    </Screen>
  );
};
