"use client";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { useCallback, useState } from "react";
import OneCard from "./oneCard.component";
import { goLeft, goRight, oneCardType } from "../store/slices/word.slice";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CardsContainer() {
  const dispatch = useAppDispatch();
  const allCards = useSelector((store: RootState) => store.main.cards);
  const position = useSelector((store: RootState) => store.main.position);
  const left = useSelector((store: RootState) => store.main.left);
  const right = useSelector((store: RootState) => store.main.right);

  const onClickLeft = () => {
    dispatch(goLeft());
  };
  const onClickRight = () => {
    dispatch(goRight());
  };

  const onCardListChange = useCallback(() => {
    return (
      <div className=" w-full flex flex-row gap-4 items-center justify-center h-[300px]">
        <Button
          size="icon"
          className={cn(allCards.length ? "" : "hidden", "z-10")}
          onClick={onClickLeft}
          disabled={!left}
        >
          <ChevronLeftIcon />
        </Button>
        <div
          className={cn("w-1/2 flex flex-row justify-center overflow-x-hidden")}
        >
          {Array.isArray(allCards)
            ? allCards.map((card, idx) => (
                <div className={cn()} key={idx}>
                  <OneCard card={card} />
                </div>
              ))
            : null}
        </div>
        <Button
          size="icon"
          className={cn(allCards.length ? "" : "hidden", "z-10")}
          onClick={onClickRight}
          disabled={!right}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    );
  }, [allCards, position]);

  return (
    <div className="flex flex-wrap w-3/4 gap-6 justify-center">
      {onCardListChange()}
    </div>
  );
}
