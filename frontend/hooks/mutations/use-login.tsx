import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/ui/notify-provider";
import { ClientCookies } from "@/lib/cookies.client";
import { login } from "@/services/api/auth";
import { useSearchParams } from "next/navigation";

export default function useLogin() {
  const searchParams = useSearchParams();
  const from = searchParams!.toString();
  const decodedUrlString = decodeURIComponent(from);
  const filteredRoute = decodedUrlString.replace(/from=/, "");

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { access_token } = response.data;
      ClientCookies.set("token", access_token);
      toast.success("Login successfully");

      if (from) {
        window.location.href = `${filteredRoute}`;
      } else {
        window.location.href = "/";
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data.detail || "Something went wrong");
    },
  });
}
