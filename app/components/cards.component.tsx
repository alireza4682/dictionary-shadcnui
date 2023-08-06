"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback, useRef } from "react";
import OneCard from "./oneCard.component";
import { oneCardType } from "../store/slices/word.slice";
import { Button } from "@/components/ui/button";

export default function Cards() {
  const allCards = useSelector((store: RootState) => store.main.cards);
  const itemsRef = useRef<Map<number, Element> | null>(null);

  function scrollToIdx(idx: number) {
    const map = getMap();
    const node = map.get(idx);
    if (node) {
      node.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map<number, Element>();
    }
    return itemsRef.current;
  }

  const onCardListChange = useCallback(
    (allCards: oneCardType[]) => {
      return (
        <>
          <Button onClick={() => scrollToIdx(0)}></Button>
          {Array.isArray(allCards) ??
            allCards.map((c, idx) => (
              <OneCard
                card={c}
                key={idx}
                ref={(node: Element) => {
                  const map = getMap();
                  if (node) {
                    map.set(idx, node);
                  } else {
                    map.delete(idx);
                  }
                }}
              />
            ))}
        </>
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
