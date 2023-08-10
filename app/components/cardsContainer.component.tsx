"use client";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { useCallback, useState } from "react";
import OneCard from "./oneCard.component";
import { goLeft, goRight, oneCardType } from "../store/slices/word.slice";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import useWindowSize from "../hooks/windowSize";

export default function CardsContainer() {
  const dispatch = useAppDispatch();
  const allCards = useSelector((store: RootState) => store.main.cards);
  const position = useSelector((store: RootState) => store.main.position);
  const left = useSelector((store: RootState) => store.main.left);
  const right = useSelector((store: RootState) => store.main.right);
  const [direction, setDirection] = useState<1 | -1>(-1);

  const windowSize = useWindowSize();
  const screenSize = () => {
    if (windowSize.width < 640) {
      return 1;
    } else if (windowSize.width < 1024) {
      return 2;
    } else return 3;
  };

  const onClickLeft = () => {
    dispatch(goLeft());
    setDirection(-1);
  };
  const onClickRight = () => {
    dispatch(goRight());
    setDirection(1);
  };

  const chooseCardsToShow = (
    arrayOfCards: oneCardType[],
    currentPos: number,
    screen: 1 | 2 | 3
  ) => {
    if (Array.isArray(arrayOfCards)) {
      for (let i = 0; i < arrayOfCards.length; i++) {
        if (screen === screenSize()) {
          return (
            <div className={cn(i === currentPos ? "" : "hidden")} key={i}>
              <OneCard card={arrayOfCards[i]} />
            </div>
          );
        } else if (screen === screenSize()) {
          return (
            <div
              className={cn(
                i === currentPos || i === currentPos + direction ? "" : "hidden"
              )}
              key={i}
            >
              <OneCard card={arrayOfCards[i]} />
            </div>
          );
        } else if (screen === screenSize()) {
          return (
            <div
              className={cn(
                i === currentPos || i === currentPos + 1 || i === currentPos - 1
                  ? ""
                  : "hidden"
              )}
              key={i}
            >
              <OneCard card={arrayOfCards[i]} />
            </div>
          );
        }
      }
    }
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
          {chooseCardsToShow(allCards, position, 3)}
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
