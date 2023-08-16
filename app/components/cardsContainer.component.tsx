"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import useWindowSize from "../hooks/windowSize";
import { oneCardType } from "../store/slices/word.slice";
import { RootState } from "../store/store";
import OneCard from "./oneCard.component";

export default function CardsContainer() {
  const allCards = useSelector((store: RootState) => store.main.cards);
  const [pos, setPos] = useState(0);
  const onClickLeft = () => {
    setPos(pos - 1);
    console.log(pos);
  };

  const onClickRight = () => {
    setPos(pos + 1);
  };

  const windowSize = useWindowSize();

  const cardsToShow = (allCards: oneCardType[]) => {
    return Array.isArray(allCards)
      ? allCards.map((card, _) => (
          <OneCard card={card} key={`${card.headWord} + ${card.mode}`} />
        ))
      : null;
  };

  return (
    <div className="flex flex-wrap w-3/4 gap-6 justify-center items-center">
      <Button
        size="icon"
        onClick={onClickLeft}
        disabled={pos < 1 + windowSize - allCards.length}
      >
        <ChevronLeftIcon />
      </Button>
      {cardsToShow(allCards)
        ?.slice()
        .splice(pos - windowSize, windowSize)}
      <Button size="icon" onClick={onClickRight} disabled={pos > -1}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
}
