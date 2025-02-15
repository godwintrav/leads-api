"use client";

import { toast } from "@/components/ui/notify-provider";
import { queryKeys } from "@/constants/query-keys";
import { updateLead } from "@/services/api/lead";
import { Lead } from "@/types";
import { useMutation } from "@tanstack/react-query";

export type UpdateLeadParams = Omit<Lead, "created"> & {
  id: number;
};

const useUpdateLead = () => {
  return useMutation({
    mutationFn: (data: UpdateLeadParams) => updateLead(data),
    mutationKey: [queryKeys.leads],
    onSuccess: () => {
      toast.success("Lead updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update lead");
    },
  });
};

export default useUpdateLead;
