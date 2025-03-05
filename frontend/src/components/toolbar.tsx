import React from 'react';
import { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger
} from '@/components/ui/menubar';
import { 
  Hand, 
  MousePointer, 
  Square, 
  Type, 
  LetterText,
  Diamond, 
  ArrowRight, 
  Eraser, 
  Image, 
  Layers, 
  Lock,
  Circle
} from 'lucide-react';

const ToolBar = () => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-background shadow-md rounded-lg p-2 flex gap-2">
      <Menubar className="flex gap-2 bg-transparent border-none shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            <MousePointer size={16} />
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            <Hand size={16} />
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            <Square size={16} />
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            <Diamond size={16} />
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            <Circle size={16} />
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            <ArrowRight size={16} />
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            <LetterText size={16} />
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            <Image size={16} />
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            <Layers size={16} />
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            <Eraser size={16} />
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-1 p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            <Lock size={16} />
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default ToolBar;
