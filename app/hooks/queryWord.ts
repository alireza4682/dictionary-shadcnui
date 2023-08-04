import { useQuery } from "@tanstack/react-query";
import { TendPoint } from "../store/slices/word.slice";

export type TData = {
  word: string;
  defs: string[];
  tags: string[];
  score: number;
};

const fetchWord = async (endpoint: TendPoint, newWord: string) => {
  const res = await fetch(
    `https://api.datamuse.com/words?${endpoint}=${newWord}&max=5&md=d`
  );
  return await res.json();
};

const useQueryWord = (endpoint: TendPoint, headWord: string) => {
  const { status, data } = useQuery({
    queryKey: ["headWord", headWord, endpoint],
    queryFn: async () => {
      const response = await fetchWord(endpoint, headWord);
      return response as TData[];
    },
  });
  return { status, data };
};

export default useQueryWord;
