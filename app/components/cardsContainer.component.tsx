"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback, useReducer, useRef, useState } from "react";
import OneCard from "./oneCard.component";
import { oneCardType } from "../store/slices/word.slice";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

const positionReducer = (state, action) => {
  switch (action.type) {
    case "add card": {
      return {};
    }
  }
};

export default function CardsContainer() {
  const [position, setPosition] = useReducer();
  const allCards = useSelector((store: RootState) => store.main.cards);

  const onClickLeft = () => {
    if (position > 0) {
      setPosition(position - 1);
    }
  };

  const onClickRight = () => {
    if (position < allCards.length - 1) {
      setPosition(position + 1);
    }
  };

  const onCardListChange = useCallback(
    (allCards: oneCardType[]) => {
      return (
        <div className=" w-full h-fit flex flex-row gap-4 items-center"></div>
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
