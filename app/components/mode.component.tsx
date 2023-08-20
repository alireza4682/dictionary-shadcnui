"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
      <SelectTrigger className="w-48">
        <SelectValue placeholder={mode} />
      </SelectTrigger>
      <SelectContent className="w-64">
        <SelectGroup>
          <SelectLabel>Modes</SelectLabel>
          <SelectItem value="ml">Means like</SelectItem>
          <SelectItem value="sl">Sounds like</SelectItem>
          <SelectItem value="rel_syn">Means like</SelectItem>
          <SelectItem value="rel_trg">triggers</SelectItem>
          <SelectItem value="rel_nry">Rhymes with</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
