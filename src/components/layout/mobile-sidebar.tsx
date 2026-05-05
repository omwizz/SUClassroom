"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import type { Profile } from "@/types/auth";
import type { DashboardRoute } from "@/types/dashboard";

type MobileSidebarProps = {
  profile: Profile;
  navigation: DashboardRoute[];
};

export function MobileSidebar({ profile, navigation }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button className="lg:hidden" size="icon" variant="ghost">
          <Menu />
          <span className="sr-only">Abrir navegación</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] p-0" side="left">
        <SheetTitle className="sr-only">Navegación del dashboard</SheetTitle>
        <DashboardSidebar
          className="bg-sidebar"
          navigation={navigation}
          onNavigate={() => setOpen(false)}
          profile={profile}
        />
      </SheetContent>
    </Sheet>
  );
}
