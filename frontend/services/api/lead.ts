import instance from "@/lib/instance";
import { Lead, LeadsApiResponse, LeadsQueryParams } from "../../types";
import {
  CREATE_LEAD,
  DELETE_LEAD,
  GET_LEADS,
  UPDATE_LEAD,
  EXPORT_LEADS,
} from "../endpoints/lead";

export const getLeads = ({
  limit,
  page,
  sort,
  engaged,
  stage,
  search,
  from_date,
  to_date,
}: LeadsQueryParams): Promise<LeadsApiResponse> => {
  return instance.get(
    GET_LEADS({
      limit,
      page,
      sort,
      engaged,
      stage,
      search,
      from_date,
      to_date,
    })
  );
};

export const createLead = (payload: Omit<Lead, "id" | "created">) => {
  return instance.post(CREATE_LEAD, payload);
};
interface DeleteLeadPayload {
  lead_ids: string[];
}

export const deleteLeads = async (payload: DeleteLeadPayload) => {
  const response = await instance.delete(DELETE_LEAD, { data: payload });
  return response.data;
};

export const updateLead = async (payload: Partial<Lead> & { id?: number }) => {
  if (!payload.id) throw new Error("Lead ID is required");
  const response = await instance.put(
    UPDATE_LEAD(payload.id.toString()),
    payload
  );
  return response.data;
};

export const exportLeads = async () => {
  const response = await instance.get(EXPORT_LEADS, { responseType: 'blob' });
  const blob = new Blob([response.data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `leads-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
  return response.data;
};
