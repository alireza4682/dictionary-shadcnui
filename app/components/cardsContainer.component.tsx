"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import useWindowSize from "../hooks/windowSize";
import { oneCardType } from "../store/slices/word.slice";
import { RootState } from "../store/store";
import OneCard from "./oneCard.component";

export default function CardsContainer() {
  const allCards = useSelector((store: RootState) => store.main.cards);

  const windowSize = useWindowSize();

  return <div className="flex flex-wrap w-3/4 gap-6 justify-center"></div>;
}
