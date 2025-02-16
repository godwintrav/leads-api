"use client";
import { Button } from "@/components/ui/button";
import { CircleArrowDown } from "lucide-react";
import { useState } from "react";

import { useExportLeads } from "@/hooks/queries/use-export-leads";

export const ExportButton = () => {
  const [shouldExport, setShouldExport] = useState(false);
  const { refetch, isFetching } = useExportLeads(shouldExport);

  const handleExport = () => {
    setShouldExport(true);
    refetch();
    setShouldExport(false);
  };

  return (
    <Button
      className="flex items-center h-[38px] gap-2"
      onClick={handleExport}
      disabled={isFetching}
    >
      <CircleArrowDown className="h-4 w-4" />
      {isFetching ? "Exporting..." : "Export All"}
    </Button>
  );
};
