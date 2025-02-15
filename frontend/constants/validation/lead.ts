import { z } from "zod";

export const leadFormSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  stage: z.number().min(0).max(4),
  engaged: z.boolean().default(false),
  last_contacted: z.date(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
