"use client";
import { QueryDatePicker } from "@/components/query/query-datepicker";
import { QuerySearchInput } from "@/components/query/query-search-input";
import { AddLead } from "./add-lead";
import { ExportButton } from "./export-button";
import { FilterSortDropdown } from "./filter-sort-dropdown";

export const LeadsHeader = () => {
  return (
    <div className="flex flex-col gap-5 mb-3 w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">Leads</h1>
        <div className="flex items-center gap-2">
          <AddLead />
          <ExportButton />
        </div>
      </div>
      <div className="flex flex-col  w-full  md:flex-row gap-3 items-center">
        <QuerySearchInput
          queryParamName="search"
          placeholder="Search by name, email or company..."
          className="w-full flex-1"
        />
        <div className="flex w-full md:w-auto  gap-3 items-center">
          <QueryDatePicker />
          <FilterSortDropdown />
        </div>
      </div>
    </div>
  );
};
