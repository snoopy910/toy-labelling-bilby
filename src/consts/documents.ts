export type IDocument = {
  id: number;
  title: string;
  body: string;
  url: string;
  label?: string[];
};

export const NUMBER_TO_FETCH = 20;
