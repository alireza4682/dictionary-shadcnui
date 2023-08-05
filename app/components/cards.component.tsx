"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback } from "react";
import OneCard from "./oneCard.component";
import { oneCardType } from "../store/slices/word.slice";

export default function Cards() {
  const allCards = useSelector((store: RootState) => store.main.cards);

  const onCardListChange = useCallback(
    (allCards: oneCardType[]) => {
      return Array.isArray(allCards)
        ? allCards.map((c, idx) => <OneCard card={c} key={idx} />)
        : null;
    },
    [allCards]
  );

  return (
    <div className="flex flex-wrap w-3/4 gap-6 justify-center [&>*]:animate-in [&>*]:slide-in-from-right-8 ">
      {onCardListChange(allCards)}
    </div>
  );
}
