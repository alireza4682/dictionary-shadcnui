"use client";
import { oneCardType } from "../store/slices/word.slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OneWord } from "./oneWord.component";
import { forwardRef, useRef } from "react";

const OneCard = forwardRef(
  (
    { card }: { card: oneCardType },
    ref: React.HTMLAttributes<HTMLDivElement>
  ) => {
    return (
      <Card className="min-w-fit max-w-[300px] " ref={ref}>
        <CardHeader>
          <CardTitle>{card.headWord}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {card.rel.map((c, idx) => (
              <OneWord wordToShow={c.word} key={idx} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);

export default OneCard;
