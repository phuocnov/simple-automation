import { workflowApi } from "@/shared/api/workflow.api";
import { Input } from "@/shared/components/ui/input";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { CreateWorkflowModal } from "./create-workflow-modal";
import { useAppDispatch } from "@/app/store/hooks";
import { Menu, X } from "lucide-react";

interface SidebarProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

export function Sidebar({ isCollapsed, toggleCollapse }: SidebarProps) {
    const form = useForm({
        defaultValues: {
            search: ""
        }
    });

    const { data: workflowResponse, isLoading, error } = useQuery({
        queryKey: ['workflows'],
        queryFn: () => workflowApi.getListWorkflow(),
    });

    const searchValue = form.watch("search");

    const filteredWorkflows = useMemo(() => {
        if (!workflowResponse?.items) return [];
        return workflowResponse.items.filter(workflow =>
            workflow.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            workflow.description?.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [workflowResponse, searchValue]);

    const dispatch = useAppDispatch();
    const handlerSelectWorkflow = async (workflowId: string) => {
        const workflow = await workflowApi.getWorkflowById(workflowId);
        dispatch({ type: 'workflow/setWorkflow', payload: workflow });
    }

    return (
    <div className="h-full bg-gray-200 p-4 overflow-y-auto">
        <div className="mb-4 flex flex-row justify-between items-center">
            {!isCollapsed && <h2 className="text-lg font-bold">Workflow List</h2>}
            {isCollapsed ? (
                <Menu className="text-sm hover:cursor-pointer mx-auto" onClick={toggleCollapse}/>
            ) : (
                <X className="text-sm hover:cursor-pointer" onClick={toggleCollapse}/>
            )}
        </div>
        
        {!isCollapsed && (
            <>
                <CreateWorkflowModal />
                <Input placeholder="Search workflows..." onChange={(e)=>
                    form.setValue("search", e.target.value)
                }/>
                
                {isLoading && <p className="text-sm text-gray-600 mt-4">Loading workflows...</p>}
                {error && <p className="text-sm text-red-600 mt-4">Error loading workflows</p>}
                
                <div className="mt-4 space-y-2">
            {filteredWorkflows.map((workflow) => (
                <div 
                    key={workflow.id} 
                    className="p-3 bg-white rounded-md shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                    onClick={() => handlerSelectWorkflow(workflow.id)}
                >
                    <h3 className="font-semibold text-sm">{workflow.name}</h3>
                    {workflow.description && (
                        <p className="text-xs text-gray-600 truncate">{workflow.description}</p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{workflow.nodeCount} nodes</span>
                        <span className={`text-xs px-2 py-1 rounded ${workflow.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {workflow.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            ))}
                </div>
            </>
        )}
    </div>
    );
}