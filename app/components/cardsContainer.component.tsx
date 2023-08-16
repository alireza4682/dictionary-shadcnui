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
    pos >= 0 && setPos(pos - 1);
  };

  const onClickRight = () => {
    pos <= allCards.length - 1 && setPos(pos + 1);
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
      <Button size="icon" onClick={onClickLeft}>
        <ChevronLeftIcon />
      </Button>
      {cardsToShow(allCards)
        ?.slice()
        .splice(pos - 3, 3)}
      <Button size="icon" onClick={onClickRight}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
}
