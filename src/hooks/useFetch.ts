import { useQuery } from "@tanstack/react-query";
import { NUMBER_TO_FETCH } from "consts";

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
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_FETCH_URL}/documents/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch document");
      }
      return await response.json();
    },
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
