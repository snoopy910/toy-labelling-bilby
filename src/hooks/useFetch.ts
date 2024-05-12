import { useState } from "react";
import { NUMBER_TO_FETCH, SuggestLabels } from "consts";
import { useQuery } from "@tanstack/react-query";

export const useFetchDocumentsWithQuery = (id: number) => {
  return useQuery({
    queryKey: ["documents", id],
    queryFn: () =>
      fetch(
        `${
          import.meta.env.VITE_FETCH_URL
        }?offset=${id}&count=${NUMBER_TO_FETCH}`
      ).then((res) => res.json()),
  });
};

// export const useUpdateLabelsWithQuery = (id: number, newLabels: string[]) => {
//   return useMutation({
//     mutationKey: ["labels", id],
//     mutationFn: () => {
//       return fetch(`${import.meta.env.VITE_FETCH_URL}/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ labels: newLabels }),
//       });
//     },
//   });
// };

export const updateLabelsToAPI = async (id: number, labels: string[]) => {
  fetch(`${import.meta.env.VITE_FETCH_URL}/${id}`, {
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
