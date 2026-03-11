import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/shared/components/ui/menubar";
import { InserNodeModel } from "./insert-node-modal";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { Button } from "@/shared/components/ui/button";
import { TypographyH3 } from "@/shared/components/typography";

export function ToolBar() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const selectedWorkflow = useAppSelector((state) => state.workflow);

  const handleEditMode = () => {
    if (selectedWorkflow.mode === "view") {
      dispatch({ type: "workflow/toggleMode", payload: "edit" });
    } else {
      dispatch({ type: "workflow/toggleMode", payload: "view" });
    }
  };

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex gap-2 items-center p-4 gap-4">
        {selectedWorkflow.name ? (
          <TypographyH3>{selectedWorkflow.name}</TypographyH3>
        ) : (
          <TypographyH3>Select a workflow</TypographyH3>
        )}
        {selectedWorkflow.mode === "view" ? (
          <Button
            className="rounded bg-primary px-2 py-1"
            onClick={handleEditMode}
          >
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              className="rounded bg-primary px-2 py-1"
              onClick={handleEditMode}
            >
              Save
            </Button>

            <Button
              className="rounded bg-amber-200 px-2 py-1"
              onClick={handleEditMode}
            >
              Discard
            </Button>
          </div>
        )}
      </div>
      <Menubar className="w-full">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarItem onClick={() => setOpen(true)}>
                Insert New Node <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <InserNodeModel open={open} onOpenChange={setOpen} />
    </div>
  );
}
