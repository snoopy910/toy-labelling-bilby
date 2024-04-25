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
  updateLabels: (ID: number, labels: string[] | undefined) => void;
}

const defaultDocuments: DocumentsContextType = {
  documents: [],
  loading: false,
  fetchDocuments: () => {},
  updateLabels: () => {},
};

export const DocumentsContext = createContext(defaultDocuments);

export const DocumentsContextProvider: React.FC<DocumentsContextProps> = ({
  children,
}) => {
  const [fetchDocuments, updateLabelsToAPI, { data, loading }] = useFetch();
  const [documents, setDocuments] = useState<IDocument[]>([]);

  useEffect(() => {
    fetchDocuments(0);
  }, []);

  useEffect(() => {
    if (!loading && data) {
      setDocuments((prevDocuments) => [...prevDocuments, ...data]);
    }
  }, [data, loading]);

  const updateLabels = (ID: number, newLabels: string[] | undefined) => {
    const updatedDocuments = documents.map((doc, index) => {
      if (index === ID) {
        return { ...doc, label: newLabels };
      }
      return doc;
    });
    // console.log(newLabels);
    setDocuments(updatedDocuments);
    newLabels && updateLabelsToAPI(ID, newLabels);
  };

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        loading,
        fetchDocuments,
        updateLabels,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
