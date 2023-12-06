import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../api/authRequest";
import useAuth from "./useAuth";
import useShoppingCart from "./useShoppingCart";
import { showToast } from "src/utilities/toast";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const LOGOUT_URL = "/logout";

function useLogout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {clearShoppingCart} = useShoppingCart();

  const sendLogoutRequest = async () => {
    try {
      const response = await axiosPrivate.get(LOGOUT_URL);
      if (response.status != 200 && response.status != 204) {
        showToast(`Failed to log out ${response.status}`);
        return;
      }

      if (response.status == 204) {
        showToast(`No refresh token was supplied`);
        return;
      }
      clearShoppingCart();
      queryClient.removeQueries();
      setAuth(null);
      navigate("/");
      showToast("Successfully logged out", "success");
    } catch (error) {
      showToast("Could not reach server");
      return;
    }
  };

  return { sendLogoutRequest };
}

export default useLogout;
