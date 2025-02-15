import { LeadsQueryParams } from "../../types";

export const CREATE_LEAD = `/leads`;
export const GET_LEAD = (id: string) => `/leads/${id}`;
export const UPDATE_LEAD = (id: string) => `/leads/${id}`;
export const DELETE_LEAD = `/leads`;
export const EXPORT_LEADS = `/leads/export`;

export const GET_LEADS = ({
  limit,
  page,
  sort = "asc",
  engaged,
  stage,
  search,
  from_date,
  to_date,
}: LeadsQueryParams) =>
  `/leads?limit=${limit || 10}${`&page=${page || 1}`}${sort ? `&sort=${sort}` : ""}${engaged ? `&engaged=${engaged}` : ""}${stage ? `&stage=${stage}` : ""}${search ? `&search=${search}` : ""}${from_date ? `&from_date=${from_date}` : ""}${to_date ? `&to_date=${to_date}` : ""}`;
