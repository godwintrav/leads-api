import { AuthContainer } from "@/components/auth/auth-container";
import { LoginForm } from "@/components/auth/login-form";
import { Loader } from "@/components/loader";
import { Suspense } from "react";

export default function Page() {
  return (
    <AuthContainer>
      <Suspense fallback={<Loader />}>
        <LoginForm />
      </Suspense>
    </AuthContainer>
  );
}
