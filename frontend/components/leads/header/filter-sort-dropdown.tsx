"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { useQueryState } from "nuqs";

export const FilterSortDropdown = () => {
  const [, setSort] = useQueryState("sort");
  const [, setEngaged] = useQueryState("engaged");
  const [, setStage] = useQueryState("stage");

  const handleSort = (value: string | null) => {
    setSort(value);
  };

  const handleEngaged = (value: string | null) => {
    setEngaged(value);
  };

  const handleStage = (value: string | null) => {
    setStage(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ListFilter className="h-4 w-4" />
          Filter & Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleSort("asc")}>
          Sort: Ascending Order
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort("desc")}>
          Sort: Descending Order
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Stage</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleStage("0")}>
              Stage 0
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStage("1")}>
              Stage 1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStage("2")}>
              Stage 2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStage("3")}>
              Stage 3
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStage("4")}>
              Stage 4
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleEngaged("true")}>
          Show Engaged Only
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEngaged("false")}>
          Show Not Engaged Only
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleEngaged(null);
            handleSort(null);
            handleStage(null);
          }}
        >
          Show All
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
