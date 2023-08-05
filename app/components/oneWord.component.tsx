"use client";
import { useSelector } from "react-redux";
import useQueryWord, { TData } from "../hooks/queryWord";
import { makeNewCard, setHeadWord } from "../store/slices/word.slice";
import { RootState, useAppDispatch } from "../store/store";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-separator";

export const OneWord = (props: { wordToShow: string }) => {
  const { wordToShow } = props;
  const mode = useSelector((store: RootState) => store.main.mode);

  const dispatch = useAppDispatch();

  const { status, data } = useQueryWord(mode, wordToShow);
  const onClickArrow = () => {
    dispatch(setHeadWord(wordToShow));
    if (status === "success" && data) {
      dispatch(makeNewCard(data));
    }
  };

  return (
    <div className="flex flex-row justify-between text-primary overflow-hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="overflow-hidden">
            {wordToShow}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{wordToShow}</DialogTitle>
          </DialogHeader>
          <div>
            {data ? JSON.stringify(data.map((w, _) => w.defs)) : <p>nothing</p>}
          </div>
        </DialogContent>
      </Dialog>
      <Button variant={"outline"} size={"icon"} onClick={() => onClickArrow()}>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
