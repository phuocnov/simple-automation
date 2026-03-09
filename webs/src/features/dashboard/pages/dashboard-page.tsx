import MainPanel from "../components/main-panel";
import { Sidebar } from "../components/sidebar";
import { Group, Panel, Separator } from "react-resizable-panels";

export default function DashboardPage() {
  return (
    <div className="fixed inset-0">
      <Group orientation="horizontal" className="h-full w-full">
        <Panel defaultSize={"20%"} minSize={20}>
          <Sidebar />
        </Panel>
        <Separator className="w-px bg-border" />
        <Panel>
          <MainPanel />
        </Panel>
      </Group>
    </div>
  );
}
