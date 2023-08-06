"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback, useRef } from "react";
import OneCard from "./oneCard.component";
import { oneCardType } from "../store/slices/word.slice";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

export default function Cards() {
  const allCards = useSelector((store: RootState) => store.main.cards);
  const itemsRef = useRef<Array<HTMLDivElement>>([]);

  function scrollToIdx(idx: number) {
    const current = getCurrent();
    const node = current[idx];
    if (node) {
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
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
        <div className=" w-full h-fit flex flex-row gap-4 items-center">
          <Button
            onClick={() => scrollToIdx(0)}
            className="sticky left-0"
            variant='outline'
            size='icon'
          ><ChevronLeftIcon /></Button>
          <div className=" flex flex-col md:flex-row snap-x overflow-scroll gap-4  rounded-lg">
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

          <Button
            onClick={() => scrollToIdx(allCards.length - 1)}
            className="sticky left-0"
            variant='outline'
            size='icon'
          ><ChevronRightIcon /></Button>
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
