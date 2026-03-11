import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { ReactFlow, Background, Controls, type Node, type NodeChange, type OnNodesChange } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { selectedWorkflow } from "../workflow.selector";
import { useCallback } from "react";

export default function MainPanel() {
  const dispatch = useAppDispatch();
  const workflow = useAppSelector(selectedWorkflow);

  const onNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
    dispatch({ type: 'workflow/onNodesChange', payload: changes });
  }, [dispatch]);

  return (
    <div className="h-full w-full bg-white p-4">
      <div className="h-full w-full">
        <ReactFlow nodes={workflow.nodes as Node[]} onNodesChange={onNodesChange}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
