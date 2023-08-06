"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback, useRef } from "react";
import OneCard from "./oneCard.component";
import { oneCardType } from "../store/slices/word.slice";
import { Button } from "@/components/ui/button";

export default function Cards() {
  const allCards = useSelector((store: RootState) => store.main.cards);
  const itemsRef = useRef<Array<HTMLDivElement>>([]);

  function scrollToIdx(idx: number) {
    const current = getCurrent();
    const node = current[idx];
    if (node) {
      node.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }

  function getCurrent() {
    if (!itemsRef.current) {
      itemsRef.current = [];
    }
    return itemsRef.current;
  }

  const onCardListChange = useCallback(
    (allCards: oneCardType[]) => {
      return (
        <div className="w-full h-[400px] border">
          <Button
            onClick={() => scrollToIdx(0)}
            className="sticky top-0"
          ></Button>
          {Array.isArray(allCards)
            ? allCards.map((c, idx) => (
                <div
                  ref={(node) => {
                    const current = getCurrent();
                    if (node) {
                      current[idx] = node;
                    } else {
                      current[idx] = {} as HTMLDivElement;
                    }
                  }}
                >
                  <OneCard card={c} key={idx} />
                </div>
              ))
            : null}
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
