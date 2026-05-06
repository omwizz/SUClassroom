"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter, Search, X } from "lucide-react";
import { COURSE_LEVEL_LABELS, COURSE_LEVELS } from "@/constants/courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CourseCategory } from "@/types/courses";

type CourseFiltersProps = {
  categories: CourseCategory[];
};

export function CourseFilters({ categories }: CourseFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const category = searchParams.get("category") ?? "all";
  const level = searchParams.get("level") ?? "all";

  function updateFilter(next: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.push(params.toString() ? `${pathname}?${params}` : pathname);
    });
  }

  function clearFilters() {
    setSearch("");
    startTransition(() => {
      router.push(pathname);
    });
  }

  return (
    <form
      className="grid gap-3 rounded-lg border border-border bg-card p-3 md:grid-cols-[minmax(220px,1fr)_220px_180px_auto]"
      onSubmit={(event) => {
        event.preventDefault();
        updateFilter({ search });
      }}
    >
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-8"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por curso, objetivo o tema"
          value={search}
        />
      </div>
      <Select
        onValueChange={(value) => updateFilter({ category: value })}
        value={category}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categories.map((item) => (
            <SelectItem key={item.id} value={item.slug}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => updateFilter({ level: value })} value={level}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Nivel" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los niveles</SelectItem>
          {COURSE_LEVELS.map((item) => (
            <SelectItem key={item} value={item}>
              {COURSE_LEVEL_LABELS[item]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <Button className="flex-1" disabled={isPending} type="submit">
          <Filter aria-hidden="true" />
          Filtrar
        </Button>
        <Button
          aria-label="Limpiar filtros"
          onClick={clearFilters}
          size="icon"
          type="button"
          variant="outline"
        >
          <X aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
