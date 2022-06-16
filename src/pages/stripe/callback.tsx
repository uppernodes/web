import { Spinner } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { Context } from "../../contexts/ContextProvider";
import { api } from "../../services/apiClient";

export default function StripeCallback() {
  const { user } = useContext(Context);

  useEffect(() => {
    if (user) {
      api
        .post("/auth/get-account-status", {
          id: user._id,
        })
        .then((res) => {
          window.location.href = "/instructor";
        });
    }
  }, [user]);

  return <Spinner color="#333" size="xl" />;
}
