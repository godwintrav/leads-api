"use client";
import { SessionExpireModal } from "@/components/session-expire-modal";
import { toast } from "@/components/ui/notify-provider";
import instance from "@/lib/instance";
import NProgress from "nprogress";
import { ReactNode, useState } from "react";

interface interceptor {
  children: ReactNode;
  token: string;
}

const Interceptor = ({ children, token }: interceptor) => {
  const [showSessionModal, setShowSessionModal] = useState(false);

  instance.interceptors.request.use((config) => {
    NProgress.start();
    if (token)
      Object.assign(config.headers, {
        Authorization: `Bearer ${token}`,
      });

    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      NProgress.done();
      return response;
    },
    (error) => {
      NProgress.done();
      if (error.code === "ERR_NETWORK" && error?.response?.status !== 503) {
        toast.error("Something went wrong, Please try again!");

        return error;
      }

      if (
        error?.response?.status === 401 &&
        error?.response?.data?.detail !== "Invalid credentials"
      ) {
        setShowSessionModal(true);
      }

      if (
        error?.response?.status === 401 &&
        error?.config &&
        !error?.config.__isRetryRequest
      ) {
        if (
          error?.response?.data?.message ===
            "Authentication failed. Please sign in." ||
          error?.response?.data?.message ===
            "Authentication failed. Please sign in."
        ) {
          setShowSessionModal(true);
        }
      }
      if (error.message.includes("ERR_CONNECTION_REFUSED")) {
        toast.error("Failed to connect to the server: Connection refused");
      }
      if (error?.response?.status === 503 && error.code === "ERR_NETWORK") {
        error.response.data.message = "Something went wrong, Please try again!";
        toast.error(error.response.data.message);
      }
      return Promise.reject(error);
    }
  );

  return (
    <>
      {children}
      <SessionExpireModal
        open={showSessionModal}
        onClose={() => setShowSessionModal(false)}
      />
    </>
  );
};

export default Interceptor;
