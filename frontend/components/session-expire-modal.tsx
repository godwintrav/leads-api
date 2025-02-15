"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { paths } from "@/constants/paths";
import { ClientCookies } from "@/lib/cookies.client";
import { AlertCircleIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

export function SessionExpireModal({
  variant = "modal",
  open = false,
  onClose,
}: {
  variant?: "modal" | "card";
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const url = `${pathname}?${searchParams}`;
    window.location.href = `${paths.auth.login}?from=${url}`;
    ClientCookies.delete("token");
    onClose?.();
  };

  return variant === "modal" ? (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        hideCloseICon={true}
        className="max-w-[90%] sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircleIcon className="h-5 w-5 text-red-500" />
            Session Expired
          </DialogTitle>
          <DialogDescription>
            Your session has expired or you are not authenticated. Please log in
            again to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button onClick={handleClick} className="ml-auto w-fit">
            Log In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : variant === "card" ? (
    <Card className="mx-auto w-full max-w-[90%] sm:max-w-[425px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircleIcon className="h-5 w-5 text-red-500" />
          Session Expired
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Your session has expired or you are not authenticated. Please log in
          again to continue.
        </p>
      </CardHeader>
      <CardContent>
        {/* This CardContent is empty to maintain the layout structure */}
      </CardContent>
      <CardFooter className="sm:justify-start">
        <Button onClick={handleClick} className="ml-auto w-fit">
          Log In
        </Button>
      </CardFooter>
    </Card>
  ) : null;
}
