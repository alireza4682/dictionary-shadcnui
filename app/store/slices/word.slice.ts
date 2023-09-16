import { TData } from "@/app/hooks/queryWord";
import { createSlice } from "@reduxjs/toolkit";

export type relType = {
  word: string;
  score: number;
};

type Tcode =
  | "syn"
  | "jjs"
  | "jjb"
  | "trg"
  | "ant"
  | "spc"
  | "gen"
  | "com"
  | "par"
  | "rhy"
  | "nry"
  | "hom"
  | "cns";

export type TendPoint = "ml" | "sl" | "sp" | `rel_${Tcode}`;

const tcodeMeanings = {
  jja: "Popular nouns modified by the given adjective",
  jjb: "Popular adjectives used to modify the given noun",
  syn: "Synonyms (words contained within the same WordNet synset)",
  trg: "Triggers (words that are statistically associated with the query word in the same piece of text)",
  ant: "Antonyms (per WordNet)",
  spc: "Kind of (direct hypernyms, per WordNet)",
  gen: "More general than (direct hyponyms, per WordNet)",
  com: "Comprises (direct holonyms, per WordNet)",
  par: "Part of (direct meronyms, per WordNet)",
  bga: "Frequent followers (w` such that P(w′|w) ≥ 0.001, per Google Books Ngrams)",
  bgb: "Frequent predecessors (w′ such that P(w|w′) ≥ 0.001, per Google Books Ngrams)",
  rhy: "Rhymes ('perfect' rhymes, per RhymeZone)",
  nry: "Approximate rhymes (per RhymeZone)",
  hom: "Homophones (sound-alike words)",
  cns: "Consonant match",
};

export type oneCardType = {
  headWord: string;
  rel: relType[];
  mode: TendPoint;
};

type MainStateType = {
  currentWord: string;
  cards: oneCardType[];
  mode: TendPoint;
};

const wordSlice = createSlice({
  name: "headWord",
  initialState: {
    currentWord: "",
    cards: [],
    mode: "ml",
  } as MainStateType,
  reducers: {
    setHeadWord: (state, action) => {
      state.currentWord = "";
      state.currentWord = action.payload;
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter((card) => {
        return JSON.stringify(card) !== JSON.stringify(action.payload);
      });
    },
    removeAllCards: (state) => {
      state.cards = [];
      state.currentWord = "";
    },
    makeNewCard: (state, action: { payload: TData[]; type: string }) => {
      const exist = state.cards.find(
        (card) =>
          card.headWord === state.currentWord && card.mode === state.mode,
      );
      if (!exist && state.currentWord) {
        state.cards.push({
          headWord: state.currentWord,
          rel: action.payload.map((obj) => {
            let word = obj.word;
            let score = obj.score;
            return { word, score };
          }),
          mode: state.mode,
        });
      }
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

const { actions, reducer } = wordSlice;
export const { setHeadWord, removeCard, removeAllCards, makeNewCard, setMode } =
  actions;
const wordReducer = reducer;
export default wordReducer;
