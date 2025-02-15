import { toast } from "@/components/ui/notify-provider";
import { queryKeys } from "@/constants/query-keys";
import { deleteLeads } from "@/services/api/lead";
import { useMutation } from "@tanstack/react-query";

export const useDeleteLead = () => {
  return useMutation({
    mutationFn: deleteLeads,
    mutationKey: [queryKeys.leads],
    onSuccess: () => {
      toast.success("Lead(s) deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete lead(s)");
    },
  });
};
