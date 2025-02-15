"use client";

import { paths } from "@/constants/paths";
import { ClientCookies } from "@/lib/cookies.client";
import { LogOut } from "lucide-react";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface LogoutButtonProps {
  position?: "left" | "right";
}

export function LogoutButton({ position = "left" }: LogoutButtonProps) {
  const handleLogout = () => {
    ClientCookies.delete("token");
    window.location.href = paths.auth.login;
  };

  return (
    <div
      className={`fixed z-[99] bottom-4 ${position === "right" ? "right-4" : "left-4"}`}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handleLogout}
              className="rounded-full bg-primary hover:bg-primary/90"
            >
              <LogOut className="h-[1.2rem] rotate-180 w-[1.2rem] text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
