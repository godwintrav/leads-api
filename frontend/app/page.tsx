import { LeadsTable } from "@/components/leads/leads-table";
import { LogoutButton } from "@/components/ui/logout-button";

export default function Page() {
  return (
    <div className="flex py-20 px-5 mx-auto max-w-6xl items-center justify-center">
      <LeadsTable />
      <LogoutButton />
    </div>
  );
}
