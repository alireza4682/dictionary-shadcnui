"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { forwardRef } from "react";
import { oneCardType } from "../store/slices/word.slice";
import { OneWord } from "./oneWord.component";

const OneCard = forwardRef(function onlyOneCard({
  card,
}: {
  card: oneCardType;
}) {
  return (
    <Card className="min-w-fit max-w-[300px] ">
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
});

export default OneCard;
