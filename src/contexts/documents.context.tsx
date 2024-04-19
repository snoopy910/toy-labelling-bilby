import React, { createContext, useState } from "react";
import { Documents, IDocument } from "../consts/documents";

interface DocumentsContextProps {
  children: React.ReactNode;
}

interface DocumentsContextType {
  documents: IDocument[];
  addLabels: (ID: number, labels: string[] | undefined) => void;
}

const defaultDocuments: DocumentsContextType = {
  documents: [],
  addLabels: () => {},
};

export const DocumentsContext = createContext(defaultDocuments);

export const DocumentsContextProvider: React.FC<DocumentsContextProps> = ({
  children,
}) => {
  const [documents, setDocuments] = useState<IDocument[]>(Documents);
  const addLabels = (ID: number, newLabels: string[] | undefined) => {
    documents[ID].label = newLabels;
    setDocuments(documents);
  };

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        addLabels,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
