import { useQuery } from "@tanstack/react-query";
import { NUMBER_TO_FETCH } from "consts";

export const useFetchCountOfDocuments = () => {
  return useQuery({
    queryKey: ["length"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_FETCH_URL}/documents/length`).then(
        (response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch count of documents");
          }
          return response.json();
        }
      ),
  });
};

export const useFetchDocumentsWithQuery = (id: number) => {
  return useQuery({
    queryKey: ["documents", id],
    queryFn: () =>
      fetch(
        `${
          import.meta.env.VITE_FETCH_URL
        }/documents?offset=${id}&count=${NUMBER_TO_FETCH}`
      ).then((res) => res.json()),
  });
};

export const useFetchDocumentWithQuery = (id: number) => {
  return useQuery({
    queryKey: ["document", id],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_FETCH_URL}/documents/${id}`).then(
        (response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch document");
          }
          return response.json();
        }
      ),
  });
};

export const updateLabelsToAPI = async (id: number, labels: string[]) => {
  fetch(`${import.meta.env.VITE_FETCH_URL}/documents/${id}`, {
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
};

export const useFetchSuggestLabelsWithQuery = () => {
  return useQuery({
    queryKey: ["suggestLabels"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_FETCH_URL}/labels`).then((res) =>
        res.json()
      ),
  });
};
