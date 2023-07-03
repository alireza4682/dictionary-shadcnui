import { TData } from "../hooks/queryWord"
import { makeNewCard } from "../store/slices/word.slice";
import { useAppDispatch } from "../store/store";
import { Button } from "./ui/button.ui";
import { ChevronRightIcon } from "@radix-ui/react-icons";


export const OneWord = (props:
  {
    wordToShow: TData;
  }) => {

  const { wordToShow } = props

  const dispatch = useAppDispatch()


  return (
    <div className="flex flex-row justify-between">
      <Button variant={"ghost"} onClick={() => makeNewCard(wordToShow.word)}>{wordToShow.word}</Button>
      <Button variant={"outline"} size={"icon"}>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
