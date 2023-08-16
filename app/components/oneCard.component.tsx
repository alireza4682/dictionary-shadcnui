"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { oneCardType, removeCard } from "../store/slices/word.slice";
import { useAppDispatch } from "../store/store";
import { OneWord } from "./oneWord.component";

const OneCard = function ({ card }: { card: oneCardType }) {
  const dispatch = useAppDispatch();

  const onClickClose = () => {
    dispatch(removeCard(card));
  };

  return (
    <Card className="w-[250px] ">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center text-sm font-extrabold">
            {card.headWord}
            <Button size="icon" variant="ghost" onClick={onClickClose}>
              <X size={20} />
            </Button>
          </div>
        </CardTitle>
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
};

export default OneCard;
