import CardsContainer from "./components/cardsContainer.component";
import InputWord from "./components/input.component";
import ModeSelector from "./components/mode.component";
import ThemeSwitch from "./components/themeSwitch";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <ModeSelector />
      <ThemeSwitch />
      <InputWord />
      <CardsContainer />
    </main>
  );
}
