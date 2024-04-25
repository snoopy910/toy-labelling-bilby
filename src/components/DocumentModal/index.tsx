import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
} from "./style";
import CloseMark from "../../assets/close-mark.svg";
import { DOCUMENTS, IDocument } from "../../consts";
import { DocumentsContext } from "../../contexts";
import { ConfirmModal } from "../ConfirmModal";
import { SuggestModal } from "../SuggestModal";

type PathParams = {
  id: string;
};

const DefaultDocument: IDocument = {
  ID: 0,
  title: "",
  body: "",
  URL: "",
};

export const DocumentModal: React.FC = () => {
  const { id } = useParams<PathParams>();

  const { documents, changeLabels } = useContext(DocumentsContext);
  const [document, setDocument] = useState<IDocument>(DefaultDocument);

  const [label, setLabel] = useState<string>("");
  const [labels, setLabels] = useState<string[] | undefined>([]);

  const [isSuggestOpen, setIsSuggestOpen] = useState<boolean>(false);
  const [isSuggestVisible, setIsSuggestVisible] = useState<boolean>(false);

  const [isConfirmOpen, setIsConfirmOpen] = useState({
    status: false,
    type: "prev",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(documents);
    if (documents.length === 0) navigate(DOCUMENTS);
  }, []);

  useEffect(() => {
    if (id) {
      setDocument(documents[parseInt(id)]);
    }
  }, [id, documents]);

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

  const handlePageController = (id: number) => {
    navigate(DOCUMENTS + "/" + id);
  };

  const onFirstClick = () => {
    if (labels?.toString() !== document.label?.toString()) {
      setIsConfirmOpen({ status: true, type: "first" });
    } else {
      handlePageController(0);
    }
  };

  const onLastClick = () => {
    if (labels?.toString() !== document.label?.toString()) {
      setIsConfirmOpen({ status: true, type: "last" });
    } else {
      handlePageController(documents.length - 1);
    }
  };

  const onPrevClick = () => {
    if (labels?.toString() !== document.label?.toString()) {
      setIsConfirmOpen({ status: true, type: "prev" });
    } else {
      if (id) handlePageController(Math.max(parseInt(id) - 1, 0));
    }
  };

  const onNextClick = () => {
    console.log(labels);
    console.log(document.label);
    if (labels?.toString() !== document.label?.toString()) {
      setIsConfirmOpen({ status: true, type: "next" });
    } else {
      if (id)
        handlePageController(Math.min(parseInt(id) + 1, documents.length - 1));
    }
  };

  const handleConfirm = () => {
    if (id) {
      handleSave(document.ID, labels);
      switch (isConfirmOpen.type) {
        case "first":
          navigate(DOCUMENTS + "/" + 0);
          break;
        case "last":
          navigate(DOCUMENTS + "/" + (documents.length - 1));
          break;
        case "prev":
          navigate(DOCUMENTS + "/" + (parseInt(id) - 1));
          break;
        case "next":
          navigate(DOCUMENTS + "/" + (parseInt(id) + 1));
      }
      setIsConfirmOpen({ status: false, type: "prev" });
    }
  };

  const handleConfirmCancel = () => {
    setIsConfirmOpen({ status: false, type: "prev" });
  };

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
          </SaveReset>
        </ControlBar>
      </Container>
    </Screen>
  );
};
