import NavigationBar from "@/components/NavigationBar";
import TabContainer from "@/components/TabContainer";
import { GameScoreProvider } from "@/contexts/ScoreContext";
import { TabProvider } from "@/contexts/TabContext";

export default function Home() {
  return (
    <TabProvider>
      <main className="min-h-screen bg-black text-white h-screen">
        <GameScoreProvider>
          <TabContainer />
          <NavigationBar />
        </GameScoreProvider>
      </main>
    </TabProvider>
  );
}
