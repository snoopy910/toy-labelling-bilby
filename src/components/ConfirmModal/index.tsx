import React from "react";
import {
  Screen,
  Container,
  Title,
  Body,
  ControllerContainer,
  SaveButton,
  CancelButton,
} from "./style";

interface ConfirmModalPropsType {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalPropsType> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <Screen>
      <Container>
        <Title>Please Confirm</Title>
        <Body>Do you want to save the changes of labels?</Body>
        <ControllerContainer>
          <SaveButton onClick={onConfirm}>Save</SaveButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </ControllerContainer>
      </Container>
    </Screen>
  );
};
