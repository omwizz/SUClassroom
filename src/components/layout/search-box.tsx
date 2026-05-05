import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBox() {
  return (
    <div className="relative hidden w-full max-w-sm md:block">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input className="pl-9" placeholder="Buscar en SUClassroom" />
    </div>
  );
}
