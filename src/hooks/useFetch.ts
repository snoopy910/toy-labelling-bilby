import { useState } from "react";
import { IDocument, DEFAULT_DOCUMENTS, NUMBER_TO_FETCH } from "../consts";

interface FetchResponse {
  data: IDocument[] | null;
  loading: boolean;
}

type FetchFunction = (id: number) => void;

export const useFetch = (): [FetchFunction, FetchResponse] => {
  const [response, setResponse] = useState<FetchResponse>({
    data: null,
    loading: false,
  });

  const fetchDocuments: FetchFunction = async (id: number) => {
    console.log(id);
    setResponse({ ...response, loading: true });
    let fetchDocuments: IDocument[] = [];
    if (DEFAULT_DOCUMENTS.length >= id + NUMBER_TO_FETCH) {
      fetchDocuments = DEFAULT_DOCUMENTS.slice(id, id + NUMBER_TO_FETCH);
    } else {
      fetchDocuments = DEFAULT_DOCUMENTS.slice(id, DEFAULT_DOCUMENTS.length);
    }
    setResponse({ data: fetchDocuments, loading: false });
  };

  return [fetchDocuments, response];
};
