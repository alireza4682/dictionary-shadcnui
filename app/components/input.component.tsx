"use client";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState, useAppDispatch } from "../store/store";
import useQueryWord from "../hooks/queryWord";
import { useEffect } from "react";
import { makeNewCard, setHeadWord } from "../store/slices/word.slice";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  search: z
    .string()
    .min(2, {
      message: "more than one charactar needed",
    })
    .max(30, {
      message: "too long",
    }),
});

export default function InputWord() {
  const word = useSelector((store: RootState) => store.main.currentWord);
  const mode = useSelector((store: RootState) => store.main.mode);

  const dispatch = useAppDispatch();

  const { status, data } = useQueryWord(mode, word);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { search: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(setHeadWord(values.search));
  }

  useEffect(() => {
    if (status === "success" && data) {
      dispatch(makeNewCard(data));
    }
  }, [word, status]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="search" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type="submit">search</Button>
      </form>
    </Form>
  );
}
