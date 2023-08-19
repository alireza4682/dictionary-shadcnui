"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import useQueryWord from "../hooks/queryWord";
import { makeNewCard, setHeadWord } from "../store/slices/word.slice";
import { RootState, useAppDispatch } from "../store/store";

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
  const inAllHeadwords = useSelector((store: RootState) =>
    store.main.cards.find((card) => card.headWord === wordToShow),
  );

  const meaningFilter = (defs: string[]) => {
    return defs?.map((def) => {
      if (def.startsWith("n")) {
        return (
          <div key={def} className="">
            <Badge className="bg-primary">noun</Badge>
            <p>{def.replace("n", "")}</p>
            <Separator />
          </div>
        );
      } else if (def.startsWith("adj")) {
        return (
          <div key={def}>
            <Badge className="bg-muted-foreground">adjective</Badge>
            <p>{def.replace("adj", "")}</p>
            <Separator />
          </div>
        );
      } else if (def.startsWith("v")) {
        return (
          <div key={def}>
            <Badge variant="outline">verb</Badge>
            <p>{def.replace("v", "")}</p>
            <Separator />
          </div>
        );
      } else
        return (
          <div key={def}>
            <Badge className="bg-ring">adverb</Badge>
            <p>{def.replace("adv", "")}</p>
            <Separator />
          </div>
        );
    });
  };

  return (
    <div className="flex flex-row justify-between text-primary">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="overflow-hidden">
            {wordToShow}
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-scroll max-h-[600px]">
          <DialogHeader>
            <DialogTitle>{wordToShow}</DialogTitle>
          </DialogHeader>
          <div className="text-sm flex flex-col gap-1">
            {data ? data.map((w, _) => meaningFilter(w.defs)) : <p>nothing</p>}
          </div>
        </DialogContent>
      </Dialog>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => onClickArrow()}
        disabled={!!inAllHeadwords}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
