import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import wordReducer from "./slices/word.slice";

const store = configureStore({
  reducer: {
    main: wordReducer
  }
})

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
