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
        ? allCards.map((c, idx) => <OneCard />)
        : null;
    },
    [allCards]
  );

  return <div>{onCardListChange(allCards)}</div>;
}
