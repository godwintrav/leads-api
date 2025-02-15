import { toast } from "@/components/ui/notify-provider";
import { queryKeys } from "@/constants/query-keys";
import { createLead } from "@/services/api/lead";
import { useMutation } from "@tanstack/react-query";

export default function useCreateLead() {
  return useMutation({
    mutationFn: createLead,
    mutationKey: [queryKeys.leads],
    onSuccess: () => {
      toast.success("Lead created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
}
