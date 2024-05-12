import React from "react";
import { DocumentsView } from "../../views";

interface DocumentBarPageProps {
  setId: React.Dispatch<React.SetStateAction<number>>;
}

export const DocumentBarPage: React.FC<DocumentBarPageProps> = ({ setId }) => {
  return <DocumentsView setId={setId} />;
};
