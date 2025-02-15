import { useMutation } from "@tanstack/react-query";

import { toast } from "@/components/ui/notify-provider";
import { signUp } from "@/services/api/auth";
import { useRouter } from "next/navigation";

export default function useSignUp() {
  const router = useRouter();
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Signup successful");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.detail || "Something went wrong, Please try again!"
      );
    },
  });
}
