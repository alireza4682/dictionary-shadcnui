import Cards from "./components/cards.component";
import InputWord from "./components/input.component";
import ThemeSwitch from "./components/themeSwitch";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <ThemeSwitch />
      <InputWord />
      <Cards />
    </main>
  );
}
