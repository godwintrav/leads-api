import { AuthContainer } from "@/components/auth/auth-container";
import { SignupForm } from "@/components/auth/signup-form";

export default function Page() {
  return (
    <AuthContainer>
      <SignupForm />
    </AuthContainer>
  );
}
