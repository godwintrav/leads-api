import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function TableSkeleton() {
  return (
    <div>
      <Table>
        <TableHeader className="bg-[#F7F8FD] py-1">
          <TableRow>
            <TableHead className="w-[28px]">
              <Skeleton className="h-4 w-4" />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Engaged</TableHead>
            <TableHead>Last Contacted</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[0, 1, 2, 3, 4].map((_, i) => (
            <TableRow key={i}>
              <TableCell className="w-[28px]">
                <Skeleton className="h-4 w-4" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[150px]" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((_, i) => (
                    <Skeleton key={i} className="h-5 w-1" />
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-[100px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-8" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
