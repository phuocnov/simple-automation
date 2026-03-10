import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { selectedWorkflow } from "../workflow.selector";

const initialNodes = [];

const initialEdges = [];

export default function MainPanel() {
  const dispatch = useAppDispatch();
  const workflow = useAppSelector(selectedWorkflow);

  return (
    <div className="h-full w-full bg-white p-4">
      <div className="h-full w-full">
        <ReactFlow nodes={initialNodes} edges={initialEdges}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
