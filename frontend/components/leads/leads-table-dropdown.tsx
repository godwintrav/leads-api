import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteLead } from "@/hooks/mutations/use-delete-lead";
import { Lead } from "@/types";
import { Row } from "@tanstack/react-table";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { AddLead } from "./header/add-lead";
import { DeleteRowModal } from "./header/delete-row-modal";

interface IOrderDropdown {
  row: Row<Lead>;
}

export const LeadTableDropdown = ({ row }: IOrderDropdown) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate: deleteLead, isPending } = useDeleteLead();

  const selectedRow = row.original;
  const selectedRowsLength = 1;

  const handleDelete = () => {
    deleteLead(
      { lead_ids: ["" + selectedRow.id] },
      {
        onSuccess() {
          setIsDeleteModalOpen(false);
        },
      }
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="w-full">
            <EllipsisVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem asChild>
            <AddLead lead={selectedRow} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteModalOpen(true)}
            className="hover:!bg-red-600/10 hover:!text-red-600 text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteRowModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleDeleteRows={handleDelete}
        singleRow={selectedRow}
        selectedRowsLength={selectedRowsLength}
        isPending={isPending}
      />
    </>
  );
};
