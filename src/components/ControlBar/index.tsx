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
import { useController } from "../../hooks/useController";
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
    type: "",
  });

  const controller = useController(id, labels, document, "", setIsConfirmOpen);

  const onClick = (type: string) => {
    controller(type);
  };

  useEffect(() => {
    if (id) {
      setDocument(documents[parseInt(id)]);
    }
  }, [id, documents]);

  const handlePageController = (id: number) => {
    navigate(PATH.DOCUMENTS + "/" + id);
  };

  const handleConfirm = () => {
    if (id) {
      handleSave(document.id, labels);
      switch (isConfirmOpen.type) {
        case "first":
          handlePageController(0);
          break;
        case "last":
          handlePageController(documents.length - 1);
          break;
        case "prev":
          handlePageController(Math.max(parseInt(id) - 1, 0));
          break;
        case "next":
          handlePageController(
            Math.min(parseInt(id) + 1, documents.length - 1)
          );
      }
      setIsConfirmOpen({ status: false, type: "" });
    }
  };

  const handleConfirmCancel = () => {
    setIsConfirmOpen({ status: false, type: "" });
  };

  const handleSave = (id: number, labels: string[] | undefined) => {
    console.log(id);
    changeLabels(id, labels);
  };

  return (
    <ControlBarLayout>
      <MoveController>
        <First onClick={() => onClick("first")}>&lt;&lt;</First>
        <Prev onClick={() => onClick("prev")}>&lt;</Prev>
        <Next onClick={() => onClick("next")}>&gt;</Next>
        <Last onClick={() => onClick("last")}>&gt;&gt;</Last>
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
