import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ControlBarLayout,
  MoveController,
  First,
  Prev,
  Next,
  Last,
  SaveReset,
  SaveButton,
  ResetButton,
} from "./style";
import { PATH, IDocument } from "../../consts";
import { DocumentsContext } from "../../contexts";
import { ConfirmModal } from "../ConfirmModal";

type PathParams = {
  id: string;
};

const DefaultDocument: IDocument = {
  id: 0,
  title: "",
  body: "",
  url: "",
};

interface ControlBarPropsType {
  labels: string[] | undefined;
  handleReset: (id: number) => void;
}

export const ControlBar: React.FC<ControlBarPropsType> = ({
  labels,
  handleReset,
}) => {
  const navigate = useNavigate();

  const { id } = useParams<PathParams>();
  const { documents, changeLabels } = useContext(DocumentsContext);
  const [document, setDocument] = useState<IDocument>(DefaultDocument);

  const [isConfirmOpen, setIsConfirmOpen] = useState({
    status: false,
    type: "prev",
  });

  useEffect(() => {
    if (id) {
      setDocument(documents[parseInt(id)]);
    }
  }, [id, documents]);

  const handlePageController = (id: number) => {
    navigate(PATH.DOCUMENTS + "/" + id);
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
    console.log(labels, document.label);
    if (labels?.toString() !== document.label?.toString()) {
      setIsConfirmOpen({ status: true, type: "prev" });
    } else {
      if (id) handlePageController(Math.max(parseInt(id) - 1, 0));
    }
  };

  const onNextClick = () => {
    if (labels?.toString() !== document.label?.toString()) {
      setIsConfirmOpen({ status: true, type: "next" });
    } else {
      if (id)
        handlePageController(Math.min(parseInt(id) + 1, documents.length - 1));
    }
  };

  const handleConfirm = () => {
    if (id) {
      handleSave(document.id, labels);
      switch (isConfirmOpen.type) {
        case "first":
          handlePageController(0);
          break;
        case "last":
          handlePageController(Math.max(parseInt(id) - 1, 0));
          break;
        case "prev":
          handlePageController(Math.max(parseInt(id) - 1, 0));
          break;
        case "next":
          handlePageController(
            Math.min(parseInt(id) + 1, documents.length - 1)
          );
      }
      setIsConfirmOpen({ status: false, type: "prev" });
    }
  };

  const handleConfirmCancel = () => {
    setIsConfirmOpen({ status: false, type: "prev" });
  };

  const handleSave = (id: number, labels: string[] | undefined) => {
    console.log(id);
    changeLabels(id, labels);
  };

  return (
    <ControlBarLayout>
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
        <SaveButton onClick={() => handleSave(document.id, labels)}>
          Save
        </SaveButton>
        <ResetButton onClick={() => handleReset(document.id)}>
          Reset
        </ResetButton>
      </SaveReset>
    </ControlBarLayout>
  );
};
