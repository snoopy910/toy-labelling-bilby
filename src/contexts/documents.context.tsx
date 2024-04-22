import React, { createContext, useEffect, useState } from "react";
import { DEFAULT_DOCUMENTS, IDocument } from "../consts/documents";
import { useFetch } from "../hooks/useFetch";

interface DocumentsContextProps {
  children: React.ReactNode;
}

interface DocumentsContextType {
  documents: IDocument[];
  loading: boolean;
  fetchDocuments: (id: number) => void;
  addLabels: (ID: number, labels: string[] | undefined) => void;
}

const defaultDocuments: DocumentsContextType = {
  documents: [],
  loading: false,
  fetchDocuments: () => {},
  addLabels: () => {},
};

export const DocumentsContext = createContext(defaultDocuments);

export const DocumentsContextProvider: React.FC<DocumentsContextProps> = ({
  children,
}) => {
  const [documents, setDocuments] = useState<IDocument[]>(() => {
    const storedDocuments = localStorage.getItem("documents") ?? "";
    if (storedDocuments !== "[]") {
      try {
        return JSON.parse(storedDocuments);
      } catch (error) {
        console.error("Error parsing documents from LocalStorage", error);
        return DEFAULT_DOCUMENTS.slice(0, 20);
      }
    } else {
      return DEFAULT_DOCUMENTS.slice(0, 20);
    }
  });

  const [fetchDocuments, { data, loading }] = useFetch();

  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    if (!loading && data) {
      setDocuments((prevDocuments) => [...prevDocuments, ...data]);
    }
  }, [data, loading]);

  const addLabels = (ID: number, newLabels: string[] | undefined) => {
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
        addLabels,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
