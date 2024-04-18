import React, { createContext, useState } from "react";
import { Documents, IDocument } from "../consts/documents";

interface DocumentsContextProps {
  children: React.ReactNode;
}

interface DocumentsContextType {
  documents: IDocument[];
}

const defaultDocuments: DocumentsContextType = {
  documents: [],
};

export const DocumentsContext = createContext(defaultDocuments);

export const DocumentsContextProvider: React.FC<DocumentsContextProps> = ({
  children,
}) => {
  const [documents, setDocuments] = useState<IDocument[]>(Documents);

  return (
    <DocumentsContext.Provider
      value={{
        documents,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
