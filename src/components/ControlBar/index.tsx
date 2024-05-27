import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmModal } from "components/ConfirmModal";
import { PATH, IDocument } from "consts";
import { DocumentsContext } from "contexts";
import { useController } from "hooks/useController";
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

type PathParams = {
  id: string;
};

interface ControlBarPropsType {
  labels: string[] | undefined;
  document: IDocument;
  handleReset: (id: number) => void;
}

export const ControlBar: React.FC<ControlBarPropsType> = ({
  labels,
  document,
  handleReset,
}) => {
  const navigate = useNavigate();

  const { id } = useParams<PathParams>();
  const { length, updateLabels } = useContext(DocumentsContext);

  const [isConfirmOpen, setIsConfirmOpen] = useState({
    status: false,
    type: "",
  });

  const controller = useController(
    id,
    length,
    labels,
    document,
    setIsConfirmOpen
  );

  const onClick = (type: string) => {
    controller(type);
  };

  const handlePageController = (id: number) => {
    navigate(`${PATH.DOCUMENTS}/${id}`);
  };

  const handleConfirm = () => {
    if (id) {
      handleSave(document.id, labels);
      switch (isConfirmOpen.type) {
        case "first":
          handlePageController(0);
          break;
        case "last":
          handlePageController(length - 1);
          break;
        case "prev":
          handlePageController(Math.max(parseInt(id) - 1, 0));
          break;
        case "next":
          handlePageController(Math.min(parseInt(id) + 1, length - 1));
      }
      setIsConfirmOpen({ status: false, type: "" });
    }
  };

  const handleConfirmCancel = () => {
    setIsConfirmOpen({ status: false, type: "" });
  };

  const handleSave = (id: number, labels: string[] | undefined) => {
    if (document.label !== labels) {
      updateLabels(id, labels);
    }
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
