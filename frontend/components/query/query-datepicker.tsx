import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, startOfMonth, subYears } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface QueryDatePickerProps {
  fromQueryParam?: string;
  toQueryParam?: string;
  defaultDateRange?: { from: Date; to: Date };
}

export const QueryDatePicker: React.FC<QueryDatePickerProps> = ({
  fromQueryParam = "from",
  toQueryParam = "to",
  defaultDateRange,
}) => {
  const today = new Date();
  const oneMonthAgo = defaultDateRange?.from || subYears(today, 1);
  const [isOpen, setIsOpen] = useState(false);

  const [urlFrom, setUrlFrom] = useQueryState(fromQueryParam);
  const [urlTo, setUrlTo] = useQueryState(toQueryParam);

  const [date, setDate] = useState<DateRange | undefined>(() => {
    if (urlFrom && urlTo) {
      return {
        from: new Date(urlFrom),
        to: new Date(urlTo),
      };
    }
    return undefined;
  });
  const from = format(date!?.from! ?? oneMonthAgo, "yyyy-MM-dd");
  const to = format(date!?.to! ?? today, "yyyy-MM-dd");

  const handleSubmit = () => {
    setUrlFrom(from);
    setUrlTo(to);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!(urlFrom && urlTo)) setDate(undefined);
  }, [urlFrom, urlTo, setDate]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-fit items-center justify-start bg-white rounded border text-left font-medium text-black hover:text-primary",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarDays size={15} className="mr-2 h-[17px] text-gray-500" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Select date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-10 flex w-auto flex-col p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={startOfMonth(today)}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className="flex items-center justify-end gap-2 mb-3 mr-5">
          <Button
            size={"sm"}
            variant="outline"
            className="rounded-md"
            onClick={() => {
              setDate(undefined);
              setUrlFrom(null);
              setUrlTo(null);
              setIsOpen(false);
            }}
            disabled={!date?.from || !date?.to}
          >
            Clear
          </Button>
          <Button size={"sm"} className="rounded-md" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
