import { env } from "@/env";
import axios from "axios";

const instance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
});

export default instance;
