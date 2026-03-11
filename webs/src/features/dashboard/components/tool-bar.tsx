import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/shared/components/ui/menubar";
import { InserNodeModel } from "./insert-node-modal";
import { useState } from "react";

export function ToolBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
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
    </>
  )
}
