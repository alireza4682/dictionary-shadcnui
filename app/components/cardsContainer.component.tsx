"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback, useState } from "react";
import OneCard from "./oneCard.component";
import { oneCardType } from "../store/slices/word.slice";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CardsContainer() {
  const allCards = useSelector((store: RootState) => store.main.cards);
  const [position, setPosition] = useState(0);
  const [leftEnable, setLeftEnable] = useState(false);
  const [rightEnable, setRightEnable] = useState(false);

  const onClickLeft = () => {
    if (position > 0) {
      if (position === allCards.length - 1) setRightEnable(true);
      setPosition(position - 1);
      if (position === 0) setLeftEnable(false);
    }
  };
  const onClickRight = () => {
    if (position < allCards.length - 1) {
      if (position === 0) setLeftEnable(true);
      setPosition(position + 1);
      if (position === allCards.length - 1) setRightEnable(false);
    }
  };

  const onCardListChange = useCallback(
    (allCards: oneCardType[]) => {
      if (allCards.length > 0 && position !== 0) setLeftEnable(true);
      if (allCards.length > 0 && position !== allCards.length - 1)
        setRightEnable(true);
      return (
        <div className=" w-full flex flex-row gap-4 items-center justify-center h-[300px]">
          <Button
            size="icon"
            className={cn(allCards.length ? "" : "hidden", "z-10")}
            onClick={onClickLeft}
            disabled={!leftEnable}
          >
            <ChevronLeftIcon />
          </Button>
          <div
            className={cn(
              "w-1/2 flex flex-row justify-center overflow-x-hidden"
            )}
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
            disabled={!rightEnable}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      );
    },
    [allCards, position]
  );

  return (
    <div className="flex flex-wrap w-3/4 gap-6 justify-center">
      {onCardListChange(allCards)}
    </div>
  );
}
