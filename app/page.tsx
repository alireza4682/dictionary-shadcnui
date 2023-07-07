import Cards from "./components/cards.component";
import InputWord from "./components/input.component";
import { OneWord } from "./components/oneWord.component";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <InputWord />
      <Cards />
      <OneWord {...{ wordToShow: "Hey" }} />
    </main>
  );
}
