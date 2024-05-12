import React, { createContext, useEffect, useState } from "react";
import { IDocument } from "consts/documents";
import { useFetchDocumentsWithQuery, updateLabelsToAPI } from "hooks";

interface DocumentsContextProps {
  children: React.ReactNode;
  id: number;
}

interface DocumentsContextType {
  documents: IDocument[];
  isLoading: boolean;
  changeLabels: (id: number, labels: string[] | undefined) => void;
}

const defaultDocuments: DocumentsContextType = {
  documents: [],
  isLoading: false,
  changeLabels: () => {},
};

export const DocumentsContext = createContext(defaultDocuments);

export const DocumentsContextProvider: React.FC<DocumentsContextProps> = ({
  children,
  id,
}) => {
  const [documents, setDocuments] = useState<IDocument[]>([]);

  const { isLoading, data } = useFetchDocumentsWithQuery(id);

  useEffect(() => {
    if (!isLoading) setDocuments(data);
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      setDocuments((prevDocuments) => [...prevDocuments, ...data]);
    }
  }, [data, isLoading]);

  const changeLabels = (id: number, newLabels: string[] | undefined) => {
    const updatedDocuments = documents.map((doc, index) =>
      index === id ? { ...doc, label: newLabels } : doc
    );
    setDocuments(updatedDocuments);

    if (newLabels) {
      updateLabelsToAPI(id, newLabels);
    }
  };

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        isLoading,
        changeLabels,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
