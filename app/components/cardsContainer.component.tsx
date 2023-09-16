"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../hooks/windowSize";
import { removeAllCards } from "../store/slices/word.slice";
import { RootState } from "../store/store";
import OneCard from "./oneCard.component";

export default function CardsContainer() {
  const allCards = useSelector((store: RootState) => store.main.cards);
  const [pos, setPos] = useState(0);
  const prevLength = useRef(allCards.length);
  const dispatch = useDispatch();

  const onClickRemoveAll = () => {
    dispatch(removeAllCards());
  };
  const onClickLeft = () => {
    setPos(pos - 1);
  };

  const onClickRight = () => {
    setPos(pos + 1);
  };

  const windowSize = useWindowSize();

  const cardsToMemo = useMemo(() => {
    if (prevLength.current > allCards.length) {
      prevLength.current = allCards.length;
      return;
    }
    setPos(0);
    return Array.isArray(allCards)
      ? allCards.map((card, _) => (
          <OneCard card={card} key={`${card.headWord} + ${card.mode}`} />
        ))
      : null;
  }, [allCards]);

  const cardsToShow = useMemo(() => {
    return cardsToMemo?.slice().splice(pos - windowSize, windowSize);
  }, [pos, windowSize, cardsToMemo]);

  return (
    <div className="flex flex-wrap w-3/4 gap-6 justify-center items-center">
      <Button
        size="icon"
        onClick={onClickLeft}
        disabled={pos < 1 + windowSize - allCards.length}
      >
        <ChevronLeftIcon />
      </Button>
      {cardsToShow}
      <Button size="icon" onClick={onClickRight} disabled={pos > -1}>
        <ChevronRightIcon />
      </Button>
      <Button size="icon" onClick={onClickRemoveAll}>
        <X />
      </Button>
    </div>
  );
}
