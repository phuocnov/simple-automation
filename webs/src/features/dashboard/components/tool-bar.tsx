import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/shared/components/ui/menubar";


export function ToolBar() {
    

    return (
    <Menubar className="w-72">
        <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
            <MenubarGroup>
            <MenubarItem>
                Insert New Node <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
                New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
        </MenubarContent>
        </MenubarMenu>
    </Menubar>
    )
}
