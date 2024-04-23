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
import { ConfirmModal } from "../ConfirmModal";
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

  const { documents, changeLabels } = useContext(DocumentsContext);

  const [label, setLabel] = useState<string>("");
  const [labels, setLabels] = useState<string[] | undefined>([]);

  const [isSuggestOpen, setIsSuggestOpen] = useState<boolean>(false);
  const [isSuggestVisible, setIsSuggestVisible] = useState<boolean>(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState({
    status: false,
    type: "prev",
  });

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
    changeLabels(id, labels);
  };

  const handleSuggest = (suggests: string[] | undefined) => {
    setLabels([...(labels || []), ...(suggests || [])]);
    setIsSuggestVisible(false);
    setTimeout(() => {
      setIsSuggestOpen(false);
    }, 480);
  };

  const handleSuggestClose = () => {
    setIsSuggestVisible(false);
    setTimeout(() => {
      setIsSuggestOpen(false);
    }, 480);
  };

  const handleReset = (id: number) => {
    setLabels(documents[id].label);
  };

  const handleClickSuggest = () => {
    setIsSuggestVisible(true);
    setIsSuggestOpen(true);
  };

  const handleRemove = (id: number) => {
    const temp = labels?.map((label) => label);
    temp?.splice(id, 1);
    setLabels(temp);
  };

  const onFirstClick = () => {
    if (labels?.toString() !== document.label?.toString()) {
      setIsConfirmOpen({ status: true, type: "first" });
    } else {
      onFirst();
    }
  };

  const onLastClick = () => {
    if (labels?.toString() !== document.label?.toString()) {
      setIsConfirmOpen({ status: true, type: "last" });
    } else {
      onLast();
    }
  };

  const onPrevClick = () => {
    if (labels?.toString() !== document.label?.toString()) {
      setIsConfirmOpen({ status: true, type: "prev" });
    } else {
      onPrev();
    }
  };

  const onNextClick = () => {
    console.log(labels);
    console.log(document.label);
    if (labels?.toString() !== document.label?.toString()) {
      setIsConfirmOpen({ status: true, type: "next" });
    } else {
      onNext();
    }
  };

  const handleConfirm = () => {
    handleSave(document.ID, labels);
    switch (isConfirmOpen.type) {
      case "first":
        onFirst();
        break;
      case "last":
        onLast();
        break;
      case "prev":
        onPrev();
        break;
      case "next":
        onNext();
    }
    setIsConfirmOpen({ status: false, type: "prev" });
  };

  const handleConfirmCancel = () => {
    setIsConfirmOpen({ status: false, type: "prev" });
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
                isVisible={isSuggestVisible}
                onConfirm={handleSuggest}
                onClose={handleSuggestClose}
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
            <First onClick={onFirstClick}>&lt;&lt;</First>
            <Prev onClick={onPrevClick}>&lt;</Prev>
            <Next onClick={onNextClick}>&gt;</Next>
            <Last onClick={onLastClick}>&gt;&gt;</Last>
            {isConfirmOpen.status && (
              <ConfirmModal
                onConfirm={handleConfirm}
                onCancel={handleConfirmCancel}
              />
            )}
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
