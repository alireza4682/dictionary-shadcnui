"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setMode, TendPoint } from "../store/slices/word.slice";
import { RootState } from "../store/store";

export default function ModeSelector() {
  const dispatch = useDispatch();
  const mode = useSelector((store: RootState) => store.main.mode);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMode(event.target.value as TendPoint));
  };

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={mode} />
      </SelectTrigger>
      <SelectContent></SelectContent>
    </Select>
  );
}
