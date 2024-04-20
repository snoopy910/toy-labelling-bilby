import React, { createContext, useEffect, useState } from "react";
import { DEFAULT_DOCUMENTS, IDocument } from "../consts/documents";

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
  const [documents, setDocuments] = useState<IDocument[]>(() => {
    const storedDocuments = localStorage.getItem("documents") ?? "";
    if (storedDocuments !== "[]") {
      try {
        return JSON.parse(storedDocuments);
      } catch (error) {
        console.error("Error parsing documents from LocalStorage", error);
        return DEFAULT_DOCUMENTS;
      }
    } else {
      return DEFAULT_DOCUMENTS;
    }
  });

  const addLabels = (ID: number, newLabels: string[] | undefined) => {
    const updatedDocuments = documents.map((doc, index) => {
      if (index === ID) {
        return { ...doc, label: newLabels };
      }
      return doc;
    });
    setDocuments(updatedDocuments);
  };

  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  // useEffect(() => {
  //   const LSstring = localStorage.getItem("documents");
  //   if (LSstring !== "[]") {
  //     console.log("B");
  //     const documents = JSON.parse(LSstring ?? "");
  //     setDocuments(documents);
  //   } else {
  //     console.log("A");
  //     setDocuments(DEFAULT_DOCUMENTS);
  //   }
  //   return () => {
  //     localStorage.setItem("documents", JSON.stringify(documents));
  //   };
  // }, []);

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
