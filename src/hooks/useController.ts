import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IDocument, PATH } from "../consts";
import { DocumentsContext } from "../contexts";

interface ConfirmOpenPropsType {
  status: boolean;
  type: string;
}

export const useController = (
  id: string | undefined,
  labels: string[] | undefined,
  document: IDocument,
  type: string,
  setIsConfirmOpen: (confirmOpenProps: ConfirmOpenPropsType) => void
) => {
  const navigate = useNavigate();
  const { documents } = useContext(DocumentsContext);

  const handlePageController = (id: number) => {
    navigate(PATH.DOCUMENTS + "/" + id);
  };

  const handleNavigator = (id: string, type: string) => {
    switch (type) {
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
        handlePageController(Math.min(parseInt(id) + 1, documents.length - 1));
    }
  };

  const onClick = (type: string) => {
    if (labels?.toString() !== document.label?.toString()) {
      setIsConfirmOpen({ status: true, type: type });
    } else {
      if (id) handleNavigator(id, type);
    }
  };

  return onClick;
};
