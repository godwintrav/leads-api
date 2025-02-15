import { queryKeys } from "@/constants/query-keys";
import { getLeads } from "@/services/api/lead";
import { LeadsQueryParams } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetLeads = ({
  engaged,
  limit,
  page,
  search,
  sort,
  stage,
  from_date,
  to_date,
}: LeadsQueryParams) => {
  return useQuery({
    queryFn: () =>
      getLeads({
        engaged,
        limit,
        page,
        search,
        sort,
        stage,
        from_date,
        to_date,
      }),

    queryKey: [
      queryKeys.leads,
      engaged,
      limit,
      page,
      search,
      sort,
      stage,
      from_date,
      to_date,
    ],
    placeholderData: (data) => data,
  });
};
