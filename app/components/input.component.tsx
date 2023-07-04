"use client";
import { useSelector } from "react-redux";
import { Button } from "./ui/button.ui";
import { Input } from "./ui/input.ui";
import { RootState, useAppDispatch } from "../store/store";
import useQueryWord from "../hooks/queryWord";
import { ChangeEvent, FormEvent } from "react";
import { makeNewCard, setHeadWord } from "../store/slices/word.slice";

export default function InputWord() {
  const word = useSelector((store: RootState) => store.main.currentWord);
  const mode = useSelector((store: RootState) => store.main.mode);

  const dispatch = useAppDispatch();

  const { status, data } = useQueryWord(mode, word);

  const searchWord = (e: FormEvent) => {
    e.preventDefault();
    if (status === "success") {
      dispatch(makeNewCard(data));
    }
  };

  const onChangeBox = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setHeadWord(e.target.value));
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="search a word" onChange={onChangeBox} />
      <Button type="submit" onSubmit={searchWord}>
        Search
      </Button>
    </div>
  );
}
