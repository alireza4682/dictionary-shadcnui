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

export type oneCardType = {
  headWord: string;
  rel: relType[];
  mode: TendPoint;
};

type MainStateType = {
  currentWord: string;
  cards: oneCardType[];
  mode: TendPoint;
  position: number;
};

const wordSlice = createSlice({
  name: "headWord",
  initialState: {
    currentWord: "",
    cards: [],
    mode: "ml",
    position: 0,
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
      state.position = state.position > 0 ? state.position - 1 : 0;
    },
    removeAllCards: (state) => {
      state.cards = [];
      state.currentWord = "";
      state.position = 0;
    },
    makeNewCard: (state, action: { payload: TData[]; type: string }) => {
      const exist = state.cards.find(
        (card) =>
          card.headWord === state.currentWord && card.mode === state.mode
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
        state.position = state.cards.length - 1;
      }
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    goRight: (state) => {
      if (state.position < state.cards.length - 1)
        state.position = state.position + 1;
    },
    goLeft: (state) => {
      if (state.position > 0) state.position = state.position - 1;
    },
  },
});

const { actions, reducer } = wordSlice;
export const {
  setHeadWord,
  removeCard,
  removeAllCards,
  makeNewCard,
  setMode,
  goLeft,
  goRight,
} = actions;
const wordReducer = reducer;
export default wordReducer;
