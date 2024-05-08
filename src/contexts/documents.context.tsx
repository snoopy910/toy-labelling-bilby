import React, { createContext, useEffect, useState } from "react";
import { IDocument } from "consts/documents";
import { useFetchDocuments } from "hooks";

interface DocumentsContextProps {
  children: React.ReactNode;
}

interface DocumentsContextType {
  documents: IDocument[];
  loading: boolean;
  fetchDocuments: (id: number) => void;
  changeLabels: (id: number, labels: string[] | undefined) => void;
}

const defaultDocuments: DocumentsContextType = {
  documents: [],
  loading: false,
  fetchDocuments: () => {},
  changeLabels: () => {},
};

export const DocumentsContext = createContext(defaultDocuments);

export const DocumentsContextProvider: React.FC<DocumentsContextProps> = ({
  children,
}) => {
  const [fetchDocuments, updateLabelsToAPI, { data, loading }] =
    useFetchDocuments();
  const [documents, setDocuments] = useState<IDocument[]>([]);

  useEffect(() => {
    fetchDocuments(0);
  }, []);

  useEffect(() => {
    if (!loading && data) {
      setDocuments((prevDocuments) => [...prevDocuments, ...data]);
    }
  }, [data, loading]);

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
        loading,
        fetchDocuments,
        changeLabels,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
