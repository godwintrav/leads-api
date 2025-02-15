export interface Lead {
  id: number;
  full_name: string;
  email: string;
  company: string;
  stage: number;
  engaged: boolean;
  last_contacted: string;
  created: string;
}

export interface PaginationMetadata {
  total_items: number;
  total_pages: number;
  items_per_page: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
}

export interface LeadsApiResponse {
  status: boolean;
  message: string;
  data: {
    leads: Lead[];
    pagination: PaginationMetadata;
  };
}

export interface LeadsQueryParams {
  limit?: number;
  page?: number;
  sort?: "asc" | "desc";
  engaged?: boolean;
  stage?: number;
  search?: string;
  from_date?: string;
  to_date?: string;
}
