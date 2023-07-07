'use client'
import  { TData } from "../hooks/queryWord";
import { oneCardType } from "../store/slices/word.slice";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.ui";
import { Separator } from "./ui/separator.ui";

const OneCard = (data:TData[]) => {



  return (
    <Card>
      <CardHeader>
        <CardTitle>{}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>yo</div>
        <Separator />
        <div>hey</div>
      </CardContent>
    </Card>
  );
};

export default OneCard;
