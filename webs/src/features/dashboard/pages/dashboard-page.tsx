import MainPanel from "../components/main-panel";
import { Sidebar } from "../components/sidebar";
import { Group, Panel, Separator } from "react-resizable-panels";
import { useState } from "react";
import { ToolBar } from "../components/tool-bar";

export default function DashboardPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="fixed inset-0">
      <Group orientation="horizontal" className="h-full w-full">
        <Panel defaultSize={isCollapsed ? "3%" : "20%"} minSize={isCollapsed ? "3%" : "20%"} maxSize={isCollapsed ? "3%" : "45%"}>
          <Sidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
        </Panel>
        <Separator className="w-px bg-border" />
        <Panel>
          <ToolBar/>
          <MainPanel />
        </Panel>
      </Group>
    </div>
  );
}
