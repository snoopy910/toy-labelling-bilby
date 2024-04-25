import { useState } from "react";
import { BASE_API, IDocument } from "../consts";

interface FetchResponse {
  data: IDocument[] | null;
  loading: boolean;
  error: string | null;
}

type FetchFunction = (id: number) => void;

export const useFetch = (): [FetchFunction, FetchResponse] => {
  const [response, setResponse] = useState<FetchResponse>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchDocuments: FetchFunction = async (id: number) => {
    setResponse({ ...response, loading: true });
    try {
      const fetchDocuments = await fetch(
        BASE_API + "?offset=" + id + "&count=" + 20
      );
      if (!fetchDocuments.ok) {
        throw new Error("Network reponse was not OK!");
      }
      const result = await fetchDocuments.json();
      setResponse({ data: result, loading: false, error: null });
    } catch (error) {
      setResponse({ ...response, loading: false, error: "An error occured." });
    }
  };
  return [fetchDocuments, response];
};
