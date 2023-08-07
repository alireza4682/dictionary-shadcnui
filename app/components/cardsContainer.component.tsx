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
  const [position, setPosition] = useState(0);
  const [leftEnable, setLeftEnable] = useState(true);
  const [rightEnable, setRightEnable] = useState(true);
  const allCards = useSelector((store: RootState) => store.main.cards);

  const onClickLeft = () => {
    if (position > 0) {
      if (position - 1 === 0) setLeftEnable(false);
      if (position === allCards.length - 1) setRightEnable(true);
      setPosition(position - 1);
    }
  };

  const onClickRight = () => {
    if (position < allCards.length - 1) {
      if (position + 1 === allCards.length - 1) setRightEnable(false);
      if (position === 0) setLeftEnable(true);
      setPosition(position + 1);
    }
  };

  const onCardListChange = useCallback(
    (allCards: oneCardType[]) => {
      return (
        <div className=" w-full flex flex-row gap-4 items-center justify-center h-[300px]">
          <Button
            size="icon"
            variant={leftEnable ? "default" : "secondary"}
            className={cn(allCards.length ? "" : "hidden", "z-10")}
          >
            <ChevronLeftIcon />
          </Button>
          <div
            className={cn(
              "w-1/2 flex flex-row justify-center overflow-x-scroll"
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
            variant={rightEnable ? "default" : "secondary"}
            className={cn(allCards.length ? "" : "hidden", "z-10")}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      );
    },
    [allCards]
  );

  return (
    <div className="flex flex-wrap w-3/4 gap-6 justify-center">
      {onCardListChange(allCards)}
    </div>
  );
}
