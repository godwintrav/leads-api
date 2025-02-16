import { queryKeys } from "@/constants/query-keys";
import { exportLeads } from "@/services/api/lead";

import { useQuery } from "@tanstack/react-query";

export const useExportLeads = (enabled: boolean) => {
  return useQuery({
    queryFn: exportLeads,
    queryKey: [queryKeys.export_leads],
    enabled,
  });
};
