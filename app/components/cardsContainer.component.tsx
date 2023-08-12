"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import useWindowSize from "../hooks/windowSize";
import {
  goLeft,
  goRight,
  oneCardType,
  setWindowSize,
} from "../store/slices/word.slice";
import { RootState, useAppDispatch } from "../store/store";
import OneCard from "./oneCard.component";

export default function CardsContainer() {
  const dispatch = useAppDispatch();
  const allCards = useSelector((store: RootState) => store.main.cards);
  const goLeftEnable = useSelector(
    (store: RootState) => store.main.goLeftEnable,
  );
  const goRightEnable = useSelector(
    (store: RootState) => store.main.goRightEnable,
  );
  const left = useSelector((store: RootState) => store.main.left);
  const right = useSelector((store: RootState) => store.main.right);

  const windowSize = useWindowSize();
  const screenSize = () => {
    if (windowSize.width < 640) {
      dispatch(setWindowSize(0));
      return 0;
    } else if (windowSize.width < 1024) {
      dispatch(setWindowSize(1));
      return 1;
    } else {
      dispatch(setWindowSize(2));
      return 2;
    }
  };
  const windowWidth = screenSize();

  const onCardListChange = useCallback(() => {
    const onClickLeft = () => {
      dispatch(goLeft());
    };
    const onClickRight = () => {
      dispatch(goRight());
    };

    const chooseCardsToShow = (
      arrayOfCards: oneCardType[],
      screen: 0 | 1 | 2,
    ) => {
      if (Array.isArray(arrayOfCards)) {
        if (screen === 1) {
          return arrayOfCards.map((card, idx) => {
            return (
              <div className={cn(idx === left ? "" : "hidden")} key={idx}>
                <OneCard card={card} />
              </div>
            );
          });
        } else if (screen === 2) {
          return arrayOfCards.map((card, idx) => {
            return (
              <div
                className={cn(idx === left || idx === right ? "" : "hidden")}
                key={idx}
              >
                <OneCard card={card} />
              </div>
            );
          });
        } else {
          return arrayOfCards.map((card, idx) => {
            return (
              <div
                className={cn(
                  idx === left || idx === right || idx === (left + right) / 2
                    ? ""
                    : "hidden",
                )}
                key={idx}
              >
                <OneCard card={card} />
              </div>
            );
          });
        }
      }
    };
    return (
      <div className=" w-full flex flex-row gap-4 items-center justify-center h-[300px]">
        <Button
          size="icon"
          className={cn(allCards.length ? "" : "hidden", "z-10")}
          onClick={onClickLeft}
          disabled={!goLeftEnable}
        >
          <ChevronLeftIcon />
        </Button>
        <div
          className={cn("w-fit flex flex-row justify-center overflow-x-hidden")}
        >
          {chooseCardsToShow(allCards, windowWidth)}
        </div>
        <Button
          size="icon"
          className={cn(allCards.length ? "" : "hidden", "z-10")}
          onClick={onClickRight}
          disabled={!goRightEnable}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    );
  }, [
    allCards,
    goLeftEnable,
    windowWidth,
    goRightEnable,
    dispatch,
    left,
    right,
  ]);

  return (
    <div className="flex flex-wrap w-3/4 gap-6 justify-center">
      {onCardListChange()}
    </div>
  );
}
