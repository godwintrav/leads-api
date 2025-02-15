import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Lead } from "@/types";
import { CircleAlert } from "lucide-react";

interface DeleteModalProps {
  handleDeleteRows: () => void;
  isOpen: boolean;
  onClose: () => void;
  selectedRowsLength?: number;
  singleRow?: Lead;
  isPending?: boolean;
}

export const DeleteRowModal = ({
  handleDeleteRows,
  isOpen,
  onClose,
  selectedRowsLength,
  singleRow,
  isPending,
}: DeleteModalProps) => {
  const isMultipleDelete = !singleRow && selectedRowsLength! > 0;
  const isSingleDelete = singleRow !== undefined;

  if (!isMultipleDelete && !isSingleDelete) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[90%] rounded-lg sm:max-w-[425px]">
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {isMultipleDelete ? (
                <>
                  {selectedRowsLength} selected{" "}
                  {selectedRowsLength === 1 ? "row" : "rows"}
                </>
              ) : (
                <>the lead for {singleRow?.full_name}</>
              )}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDeleteRows}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
