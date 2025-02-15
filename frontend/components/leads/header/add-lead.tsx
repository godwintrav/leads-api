"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { leadFormSchema, LeadFormValues } from "@/constants/validation/lead";
import useCreateLead from "@/hooks/mutations/use-create-lead";
import useUpdateLead from "@/hooks/mutations/use-update-lead";
import { cn } from "@/lib/utils";
import { Lead } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarDays, Edit, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface AddLeadProps {
  lead?: Lead;
}

export const AddLead = ({ lead }: AddLeadProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
  });

  const { mutate: createLead, isPending: isCreating } = useCreateLead();
  const { mutate: updateLead, isPending: isUpdating } = useUpdateLead();
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (lead) {
      form.reset({
        ...lead,
        last_contacted: new Date(lead.last_contacted),
      });
    }
  }, [lead, form]);

  const onSubmit = (values: LeadFormValues) => {
    const formattedValues = {
      ...values,
      last_contacted: format(values.last_contacted, "yyyy-MM-dd"),
    };
    const mutation = lead ? updateLead : createLead;
    const payload = lead
      ? { ...formattedValues, id: lead.id }
      : formattedValues;

    // @ts-expect-error TODO: fix this
    mutation(payload, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {lead ? (
          <div className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground  [&_svg]:size-4 [&_svg]:shrink-0">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </div>
        ) : (
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{lead ? "Edit Lead" : "Add New Lead"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Corp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stage</FormLabel>
                  <Select
                    value={field.value ? String(field.value) : undefined}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Stage 0</SelectItem>
                      <SelectItem value="1">Stage 1</SelectItem>
                      <SelectItem value="2">Stage 2</SelectItem>
                      <SelectItem value="3">Stage 3</SelectItem>
                      <SelectItem value="4">Stage 4</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_contacted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Contacted</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full rounded-md border-gray-200 pl-3 text-left font-normal"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select Date</span>
                          )}
                          <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto z-[999]  p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="engaged"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2.5 shadow-sm !space-y-0">
                  <FormLabel>Engaged</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending
                ? lead
                  ? "Updating..."
                  : "Adding..."
                : lead
                  ? "Update Lead"
                  : "Add Lead"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
