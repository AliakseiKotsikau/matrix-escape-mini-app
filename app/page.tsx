import HomeTab from "@/components/HomeTab";
import { TabProvider } from "@/contexts/TabContext";

export default function Home() {
  return (
    <TabProvider>
      <main className="min-h-screen bg-black text-white">
        <HomeTab/>
      </main>
    </TabProvider>
  );
}
