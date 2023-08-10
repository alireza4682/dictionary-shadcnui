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
  left: number;
  right: number;
  goLeftEnable: boolean;
  goRightEnable: boolean;
};

const wordSlice = createSlice({
  name: "headWord",
  initialState: {
    currentWord: "",
    cards: [],
    mode: "ml",
    left: 0,
    right: 0,
    goLeftEnable: false,
    goRightEnable: false,
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
      if (!state.cards[state.right] && state.cards[state.right - 1])
        state.right = state.right - 1;
    },
    removeAllCards: (state) => {
      state.cards = [];
      state.currentWord = "";
      state.left = 0;
      state.right = 0;
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
        let oldRight = state.right;
        state.right = state.cards.length - 1;
        state.left = state.left + (state.right - oldRight);
      }
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    goRight: (state) => {
      if (state.right < state.cards.length - 1) {
        state.right++;
        state.left++;
      }
      if (state.right === state.cards.length - 1) state.goRightEnable = false;
      if (state.left > 0) state.goLeftEnable = true;
    },
    goLeft: (state) => {
      if (state.left > 0) {
        state.left--;
        state.right--;
      }
      if (state.left === 0) state.goLeftEnable = false;
      if (state.right < state.cards.length - 1 && state.right > 0)
        state.goRightEnable = true;
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
