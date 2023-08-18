"use client";

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
    <select value={mode} onChange={handleChange}>
      <option value="ml">ml</option>
      <option value="sl">sl</option>
      <option value="sp">sp</option>
      <option value="rel_syn">rel_syn</option>
      <option value="rel_jjs">rel_jjs</option>
      <option value="rel_jjb">rel_jjb</option>
      <option value="rel_trg">rel_trg</option>
      <option value="rel_ant">rel_ant</option>
      <option value="rel_spc">rel_spc</option>
      <option value="rel_gen">rel_gen</option>
      <option value="rel_com">rel_com</option>
      <option value="rel_par">rel_par</option>
      <option value="rel_rhy">rel_rhy</option>
      <option value="rel_nry">rel_nry</option>
      <option value="rel_hom">rel_hom</option>
      <option value="rel_cns">rel_cns</option>
    </select>
  );
}
