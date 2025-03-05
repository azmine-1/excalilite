import React from 'react';
import { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger, 
  MenubarContent, 
  MenubarItem 
} from '@/components/ui/menubar';
import { 
  Hand, 
  MousePointer, 
  Square, 
  Type, 
  Diamond, 
  CircleDot, 
  ArrowRight, 
  Eraser, 
  Image, 
  Layers, 
  Lock, 
  Undo, 
  Redo 
} from 'lucide-react';

const ToolBar = () => {
  return (
    <Menubar className="flex h-12 rounded-none border-b border-border bg-background px-2 py-1">
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 px-2 py-1 hover:bg-accent hover:text-accent-foreground">
          <MousePointer size={16} />
          Select
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 px-2 py-1 hover:bg-accent hover:text-accent-foreground">
          <Hand size={16} />
          Hand
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 px-2 py-1 hover:bg-accent hover:text-accent-foreground">
          <Square size={16} />
          Rectangle
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 px-2 py-1 hover:bg-accent hover:text-accent-foreground">
          <Diamond size={16} />
          Diamond
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 px-2 py-1 hover:bg-accent hover:text-accent-foreground">
          <ArrowRight size={16} />
          Arrow
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 px-2 py-1 hover:bg-accent hover:text-accent-foreground">
          <Type size={16} />
          Text
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 px-2 py-1 hover:bg-accent hover:text-accent-foreground">
          <Image size={16} />
          Image
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 px-2 py-1 hover:bg-accent hover:text-accent-foreground">
          <Layers size={16} />
          Frame
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 px-2 py-1 hover:bg-accent hover:text-accent-foreground">
          <Eraser size={16} />
          Eraser
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 px-2 py-1 hover:bg-accent hover:text-accent-foreground">
          <Lock size={16} />
          Lock
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default ToolBar;
