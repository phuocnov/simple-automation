import { useAppDispatch } from "@/app/store/hooks";
import { nodeApi, type Item } from "@/shared/api/node.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";

export function InserNodeModel(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dispatch = useAppDispatch()

  const { data: listNode, isLoading, error } = useQuery({
    queryKey: ['node_definitions'],
    queryFn: () => nodeApi.getAllNodeDefinition(),
  })

  const handlerSelectNode = (node: Item) => {
    dispatch({ type: 'workflow/addNode', payload: node })
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Select Node to insert</DialogTitle>
          <DialogDescription>
            Add a new node to get started
          </DialogDescription>
        </DialogHeader>

        {isLoading && <p className="text-sm text-gray-600 mt-4">Loading nodes...</p>}
        {error && <p className="text-sm mt-4 text-red-600">Error loading nodes</p>}
        <div className="flex flex-col gap-1">
          {listNode?.items.map((node) => (
            <div
              key={node.type}
              className="p-3 bg-primary rounded-md shadow-sm hover:shadow-md cursor-pointer transition-shadow"
              onClick={() => handlerSelectNode(node)}
            >
              <h3 className="font-semibold text-sm">{node.name}</h3>
              {node.name && (
                <p className="text-xs text-gray-600 truncate">{node.name}</p>
              )}
            </div>
          ))}
        </div>

      </DialogContent>
    </Dialog >
  )
}
