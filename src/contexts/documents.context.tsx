import React, { createContext, useEffect, useState } from "react";
import { IDocument } from "../consts/documents";
import { useFetch } from "../hooks/useFetch";

interface DocumentsContextProps {
  children: React.ReactNode;
}

interface DocumentsContextType {
  documents: IDocument[];
  loading: boolean;
  fetchDocuments: (id: number) => void;
  changeLabels: (ID: number, labels: string[] | undefined) => void;
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
  const [fetchDocuments, { data, loading }] = useFetch();
  const [documents, setDocuments] = useState<IDocument[]>([]);

  useEffect(() => {
    fetchDocuments(0);
  }, []);

  useEffect(() => {
    if (!loading && data) {
      setDocuments((prevDocuments) => [...prevDocuments, ...data]);
    }
  }, [data, loading]);

  const changeLabels = (ID: number, newLabels: string[] | undefined) => {
    const updatedDocuments = documents.map((doc, index) => {
      if (index === ID) {
        return { ...doc, label: newLabels };
      }
      return doc;
    });
    setDocuments(updatedDocuments);
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
