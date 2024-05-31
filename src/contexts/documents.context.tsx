import React, { createContext, useEffect, useState } from "react";
import { IDocument } from "consts/documents";
import { useFetchDocumentsWithQuery, updateLabelsToAPI } from "hooks";

interface DocumentsContextProps {
  children: React.ReactNode;
}

interface DocumentsContextType {
  id: number;
  documents: IDocument[];
  isLoading: boolean;
  length: number;
  updateLabels: (id: number, labels: string[] | undefined) => void;
  setId: (id: number) => void;
}

const defaultDocuments: DocumentsContextType = {
  id: 0,
  documents: [],
  isLoading: false,
  length: 0,
  updateLabels: () => {},
  setId: () => {},
};

export const DocumentsContext = createContext(defaultDocuments);

export const DocumentsContextProvider: React.FC<DocumentsContextProps> = ({
  children,
}) => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [id, setId] = useState(0);

  const { isLoading, data } = useFetchDocumentsWithQuery(id);

  useEffect(() => {
    if (!isLoading) setDocuments(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      setDocuments((prevDocuments) => [...prevDocuments, ...data]);
    }
  }, [data, isLoading]);

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
        id,
        documents,
        isLoading,
        length,
        updateLabels,
        setId,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
