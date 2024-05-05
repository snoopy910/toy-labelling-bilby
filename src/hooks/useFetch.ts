import { useState } from "react";
import { IDocument, NUMBER_TO_FETCH } from "../consts";
import { BASE_API } from "../consts";

interface FetchResponse {
  data: IDocument[] | null;
  loading: boolean;
  error: string | null;
}

type FetchFunction = (id: number) => void;
type UpdateFunction = (id: number, labels: string[]) => void;

export const useFetch = (): [FetchFunction, UpdateFunction, FetchResponse] => {
  const [response, setResponse] = useState<FetchResponse>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchDocuments: FetchFunction = async (id: number) => {
    setResponse({ ...response, loading: true });
    try {
      const fetchDocuments = await fetch(
        BASE_API + "?offset=" + id + "&count=" + NUMBER_TO_FETCH
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

  const updateLabelsToAPI = async (id: number, labels: string[]) => {
    try {
      await fetch(BASE_API + "/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ labels: labels }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK!");
        }
      });
    } catch (error) {
      setResponse({ ...response, loading: false, error: "An error occured." });
    }
  };
  return [fetchDocuments, updateLabelsToAPI, response];
};
