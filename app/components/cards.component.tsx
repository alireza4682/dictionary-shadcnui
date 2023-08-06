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
      node.scrollIntoView({});
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
        <div className="w-full h-fit flex flex-col md:flex-row scroll-smooth snap-x overflow-scroll gap-4 px-10 py-4 border-2 rounded-lg">
          <Button
            onClick={() => scrollToIdx(0)}
            className="sticky top-0"
          ></Button>
          {Array.isArray(allCards)
            ? allCards.map((c, idx) => (
                <div
                  className="snap-center"
                  ref={(node) => {
                    const current = getCurrent();
                    if (node) {
                      current[idx] = node;
                      scrollToIdx(idx);
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
