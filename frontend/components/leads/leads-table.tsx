"use client";
import { TableEmptyState } from "@/components/empty-state/table-empty-state";
import { QueryPagination } from "@/components/query/query-pagination";
import { TableSkeleton } from "@/components/skeleton/table-skeleton";
import { DataTableWithFilter } from "@/components/ui/data-table-with-filter";
import { useGetLeads } from "@/hooks/queries/use-get-leads";
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import { Card } from "../ui/card";
import { LeadsHeader } from "./header/leads-header";
import { LeadsColumns } from "./leads-columns";

export const LeadsTable = () => {
  const [pramsEngaged] = useQueryState("engaged", parseAsBoolean);
  const [pramsStage] = useQueryState("stage", parseAsInteger);
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [sort] = useQueryState("sort", parseAsString);
  const [urlFrom] = useQueryState("from");
  const [urlTo] = useQueryState("to");
  const [page] = useQueryState("page", parseAsInteger);

  const [limit] = useQueryState("limit", parseAsInteger);

  const { data, isLoading, isError, refetch } = useGetLeads({
    engaged: pramsEngaged!,
    limit: limit!,
    page: page!,
    search: search!,
    stage: pramsStage!,
    from_date: urlFrom!,
    to_date: urlTo!,
    sort: sort! as "asc" | "desc",
  });

  const leads = data?.data?.leads;

  return (
    <div className="flex flex-col gap-3 w-full">
      <LeadsHeader />
      <Card className="bg-white rounded-lg ">
        {isLoading ? (
          <TableSkeleton />
        ) : leads?.length! > 0 ? (
          <div>
            <DataTableWithFilter columns={LeadsColumns} data={leads!} />

            <QueryPagination
              current_page={data?.data?.pagination?.current_page!}
              total_pages={data?.data?.pagination?.total_pages!}
            />
          </div>
        ) : isError ? (
          <div className="">
            <TableEmptyState
              columns={LeadsColumns}
              title="Something went wrong"
              description="Please try again."
              onClick={refetch}
            />
          </div>
        ) : (
          <div className="">
            <TableEmptyState
              columns={LeadsColumns}
              title="Leads table is empty."
              description="Create new lead for them to show up here."
            />
          </div>
        )}
      </Card>
    </div>
  );
};
