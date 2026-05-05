"use client";

import { LogOut, UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_LABELS } from "@/constants/roles";
import { logoutUser } from "@/server/actions/auth-actions";
import type { Profile } from "@/types/auth";

export function UserMenu({ profile }: { profile: Profile }) {
  const initials =
    profile.fullName
      ?.split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "SU";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2" variant="ghost">
          <Avatar className="size-7">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden max-w-32 truncate sm:inline">
            {profile.fullName ?? "Usuario"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <span className="block truncate">{profile.email}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {ROLE_LABELS[profile.activeRole]}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <UserRound className="size-4" />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={logoutUser}>
          <DropdownMenuItem asChild>
            <button className="w-full" type="submit">
              <LogOut className="size-4" />
              Salir
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
