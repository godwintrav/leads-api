import { Button } from "@/components/ui/button";
import { useDeleteLead } from "@/hooks/mutations/use-delete-lead";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteRowModal } from "./delete-row-modal";

interface DeleteRowsProps {
  // @ts-expect-error expect-error
  table: Table<TData>;
  className?: string;
}

export const DeleteRows = ({ table, className }: DeleteRowsProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const selectedRowsLength = table.getSelectedRowModel().rows.length;
  const selectedRows = table
    .getSelectedRowModel()
    .rows?.map((row) => row.original.id);

  const { mutate: deleteLead, isPending } = useDeleteLead();

  const handleDelete = () => {
    deleteLead({ lead_ids: selectedRows });
    setIsDeleteModalOpen(false);
  };

  if (selectedRowsLength === 0) return null;

  return (
    <>
      <Button
        className={cn(
          "h-8 w-fit !cursor-pointer  absolute z-50 left-44 md:left-auto  md:right-4 top-2",
          className
        )}
        variant="outline"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <Trash2
          className=" opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />

        <span className=" inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
          {selectedRowsLength}
        </span>
      </Button>

      <DeleteRowModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleDeleteRows={handleDelete}
        selectedRowsLength={selectedRowsLength}
        isPending={isPending}
      />
    </>
  );
};
