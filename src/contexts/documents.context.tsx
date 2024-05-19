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
  length: number;
  updateLabels: (id: number, labels: string[] | undefined) => void;
  updateCurrentId: (id: number) => void;
}

const defaultDocuments: DocumentsContextType = {
  documents: [],
  isLoading: false,
  length: 0,
  updateLabels: () => {},
  updateCurrentId: () => {},
};

export const DocumentsContext = createContext(defaultDocuments);

export const DocumentsContextProvider: React.FC<DocumentsContextProps> = ({
  children,
  id,
}) => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [length, setLength] = useState<number>(0);
  const [currentId, setCurrentId] = useState(0);

  const { isLoading, data } = useFetchDocumentsWithQuery(id);

  useEffect(() => {
    if (!isLoading) setDocuments(data);
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      setDocuments((prevDocuments) => [...prevDocuments, ...data]);
    }
  }, [data, isLoading]);

  useEffect(() => {
    setLength(Math.max(length, currentId + 1, documents.length));
  }, [currentId, documents]);

  const updateCurrentId = (id: number) => {
    setCurrentId(id);
  };

  const updateLabels = (id: number, newLabels: string[] | undefined) => {
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
        length,
        updateLabels,
        updateCurrentId,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
