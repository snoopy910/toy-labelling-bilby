import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Screen,
  Container,
  Title,
  Body,
  LabelContainer,
  Label,
  LabelSide,
  StyledLabel,
  LabelInput,
  SuggestButton,
  LabelBox,
  LabelItem,
  RemoveButton,
  CloseSVG,
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
import CloseMark from "../../assets/close-mark.svg";
import { IDocument } from "../../consts/documents";
import { DocumentsContext } from "../../contexts";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import { SuggestModal } from "../SuggestModal";

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
  const ref = useRef(null);
  useOutsideAlerter(ref, onClose);

  const { documents, addLabels } = useContext(DocumentsContext);

  const [label, setLabel] = useState<string>("");
  const [labels, setLabels] = useState<string[] | undefined>([]);

  const [isSuggestOpen, SetIsSuggestOpen] = useState(false);

  useEffect(() => {
    setLabels(document.label);
  }, [document]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setLabels([...(labels || []), label]);
      setLabel("");
    }
  };

  const handleSave = (id: number, labels: string[] | undefined) => {
    addLabels(id, labels);
  };

  const handleSuggest = (suggests: string[] | undefined) => {
    setLabels([...(labels || []), ...(suggests || [])]);
    SetIsSuggestOpen(false);
  };

  const handleReset = (id: number) => {
    setLabels(documents[id].label);
  };

  const handleClickSuggest = () => {
    SetIsSuggestOpen(true);
  };

  const handleRemove = (id: number) => {
    const temp = labels?.map((label) => label);
    temp?.splice(id, 1);
    setLabels(temp);
  };

  if (!isOpen) return null;

  return (
    <Screen>
      <Container ref={ref}>
        <Title>{document.title}</Title>
        <Body>{document.body}</Body>
        <GoToArticle>
          <a href={document.URL} target="_blank">
            Go To Article -&gt;
          </a>
        </GoToArticle>
        <LabelContainer>
          <LabelSide>
            <StyledLabel>
              <Label htmlFor="text">Label</Label>
              <LabelInput
                type="text"
                value={label}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </StyledLabel>
            <SuggestButton onClick={handleClickSuggest}>Suggest</SuggestButton>
            {isSuggestOpen && (
              <SuggestModal
                onConfirm={handleSuggest}
                onClose={() => SetIsSuggestOpen(false)}
              />
            )}
          </LabelSide>
          <LabelBox>
            {labels?.map((label, index) => (
              <LabelItem key={index}>
                {label}
                <RemoveButton
                  onClick={() => {
                    handleRemove(index);
                  }}
                >
                  <CloseSVG src={CloseMark} alt="Close Mark" />
                </RemoveButton>
              </LabelItem>
            ))}
          </LabelBox>
        </LabelContainer>
        <ControlBar>
          <MoveController>
            <First onClick={onFirst}>&lt;&lt;</First>
            <Prev onClick={onPrev}>&lt;</Prev>
            <Next onClick={onNext}>&gt;</Next>
            <Last onClick={onLast}>&gt;&gt;</Last>
          </MoveController>
          <SaveReset>
            <SaveButton onClick={() => handleSave(document.ID, labels)}>
              Save
            </SaveButton>
            <ResetButton onClick={() => handleReset(document.ID)}>
              Reset
            </ResetButton>
            <CloseButton onClick={onClose}>Close</CloseButton>
          </SaveReset>
        </ControlBar>
      </Container>
    </Screen>
  );
};
