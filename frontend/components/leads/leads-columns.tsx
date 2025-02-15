"use client";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { cn } from "@/lib/utils";
import { Lead } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Checkbox } from "../ui/checkbox";
import { LeadTableDropdown } from "./leads-table-dropdown";

export const LeadsColumns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="mt-1.5"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = row.original.full_name;
      const email = row.original.email || "";
      const initials = name
        ?.split(" ")
        ?.map((n) => n[0])
        ?.join("");

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-primary bg-primary/10">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            <span className="text-sm text-muted-foreground">{email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.original.company}</div>
    ),
  },
  {
    accessorKey: "stage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage" />
    ),
    cell: ({ row }) => {
      const stage = row.original.stage || 0;
      const totalStages = 4;

      return (
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: totalStages }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  `h-5 w-1 rounded`,
                  index + 1 <= stage ? "bg-primary" : "bg-gray-200"
                )}
              />
            ))}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "engaged",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Engaged" />
    ),
    cell: ({ row }) => {
      const isEngaged = row.original.engaged;
      return (
        <Badge
          variant="secondary"
          className={cn(
            "font-normal rounded",
            isEngaged
              ? "bg-green-600/10 text-[#1B851B]"
              : "border text-gray-500 border-gray-300"
          )}
        >
          <div className="flex items-center gap-2">
            {isEngaged ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <Clock className="h-3 w-3" />
            )}
            {isEngaged ? "Engaged" : "Not Engaged"}
          </div>
        </Badge>
      );
    },
  },
  {
    accessorKey: "last_contacted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Contacted" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.original.last_contacted}</div>
    ),
  },
  {
    id: "actions",
    cell: LeadTableDropdown,
  },
];
