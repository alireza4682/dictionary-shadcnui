import { TData } from "@/app/hooks/queryWord";
import { createSlice } from "@reduxjs/toolkit";

export type relType = {
  headWord: string;
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
  initialState: { currentWord: "", cards: [], mode: "ml" } as MainStateType,
  reducers: {
    setHeadWord: (state, action) => {
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
    makeNewCard: (state, action) => {
      const exist = state.cards.find(
        (card) =>
          card.headWord === state.currentWord && card.mode === state.mode
      );
      if (!exist && state.currentWord) {
        state.cards.push({
          headWord: state.currentWord,
          rel: action.payload.defs,
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
