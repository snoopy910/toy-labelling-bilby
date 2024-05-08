import { useState } from "react";
import { IDocument, NUMBER_TO_FETCH, SuggestLabels } from "consts";

interface FetchedDocuments {
  data: IDocument[] | null;
  loading: boolean;
  error: string | null;
}

type FetchDocumentsFunction = (id: number) => void;
type UpdateLabelsFunction = (id: number, labels: string[]) => void;

export const useFetchDocuments = (): [
  FetchDocumentsFunction,
  UpdateLabelsFunction,
  FetchedDocuments
] => {
  const [fetchedDocuments, setFetchedDocuments] = useState<FetchedDocuments>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchDocuments: FetchDocumentsFunction = async (id: number) => {
    setFetchedDocuments({ ...fetchedDocuments, loading: true });
    try {
      const fetchDocuments = await fetch(
        `${
          import.meta.env.VITE_FETCH_URL
        }?offset=${id}&count=${NUMBER_TO_FETCH}`
      );
      if (!fetchDocuments.ok) {
        throw new Error("Network reponse was not OK!");
      }
      const result = await fetchDocuments.json();
      setFetchedDocuments({ data: result, loading: false, error: null });
    } catch (error) {
      setFetchedDocuments({
        ...fetchedDocuments,
        loading: false,
        error: "An error occured.",
      });
    }
  };

  const updateLabelsToAPI = async (id: number, labels: string[]) => {
    try {
      await fetch(`${import.meta.env.VITE_FETCH_URL}/${id}`, {
        method: "PUT",
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
      setFetchedDocuments({
        ...fetchedDocuments,
        loading: false,
        error: "An error occured.",
      });
    }
  };
  return [fetchDocuments, updateLabelsToAPI, fetchedDocuments];
};

export interface FetchedSuggestLabels {
  suggestLabels: string[];
  loading: boolean;
}

type FetchSuggestLabelsFunction = () => void;

export const useFetchSuggestLabels = (): [
  FetchedSuggestLabels,
  FetchSuggestLabelsFunction
] => {
  const [fetchedSuggestLabels, setFetchedSuggestLabels] =
    useState<FetchedSuggestLabels>({
      suggestLabels: [],
      loading: false,
    });
  const fetchSuggestLabels = async () => {
    setFetchedSuggestLabels({ ...fetchedSuggestLabels, loading: true });
    setTimeout(() => {
      const shuffledArray = SuggestLabels.sort(() => 0.5 - Math.random());
      const numElements = Math.floor(Math.random() * 3) + 3;
      setFetchedSuggestLabels({
        suggestLabels: shuffledArray.slice(0, numElements),
        loading: false,
      });
    }, 1000);
  };
  return [fetchedSuggestLabels, fetchSuggestLabels];
};
