"use client";
import useQueryWord, { TData } from "../hooks/queryWord";
import { makeNewCard, setHeadWord } from "../store/slices/word.slice";
import { useAppDispatch } from "../store/store";
import { Button } from "./ui/button.ui";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export const OneWord = () =>
  // props: { wordToShow: TData }
  {
    // const { wordToShow } = props;

    const dispatch = useAppDispatch();
    const { status, data } = useQueryWord("ml", "hit");

    const onClickArrow = () => {
      dispatch(setHeadWord("hit"));
      if (status === "success") {
        dispatch(makeNewCard(data));
      }
    };

    return (
      <div className="flex flex-row justify-between text-black">
        <Button variant={"ghost"} onClick={() => onClickArrow()}>
          {data?.word}
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  };
