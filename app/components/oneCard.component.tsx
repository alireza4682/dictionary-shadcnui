import { oneCardType } from "../store/slices/word.slice";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.ui";
import { Separator } from "./ui/separator.ui";

const OneCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>wow</CardTitle>
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
