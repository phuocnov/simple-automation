import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { CreateWorkflowDto } from "@/shared/api/workflow.type";
import { workflowApi } from "@/shared/api/workflow.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

export function CreateWorkflowModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateWorkflowDto>({
    defaultValues: {
      name: "",
      description: ""
    }
  });

  const { mutate: createWorkflow, isPending } = useMutation({
    mutationFn: (data: CreateWorkflowDto) => workflowApi.createWorkflow(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
      reset();
      setOpen(false);
    }
  });

  const onSubmit = (data: CreateWorkflowDto) => {
    createWorkflow(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mb-4">Create Workflow</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
          <DialogDescription>
            Add a new workflow to get started
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">Workflow Name *</label>
            <Input
              placeholder="Enter workflow name"
              {...register("name", { required: "Name is required" })}
              disabled={isPending}
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Description</label>
            <Textarea
              placeholder="Enter workflow description (optional)"
              {...register("description")}
              disabled={isPending}
              rows={4}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
