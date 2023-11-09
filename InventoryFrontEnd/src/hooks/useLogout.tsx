import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../api/authRequest";
import useAuth from "./useAuth";
import useShoppingCart from "./useShoppingCart";

const LOGOUT_URL = "/logout";

function useLogout() {
  const [errMsg, setErrMsg] = useState<string>("");
  const { setAuth } = useAuth();
  const {clearShoppingCart} = useShoppingCart();

  const sendLogoutRequest = async () => {
    try {
      const response = await axiosPrivate.get(LOGOUT_URL);
      if (response.status != 200 && response.status != 204) {
        setErrMsg(`Failed to log out ${response.status}`);
        return;
      }

      if (response.status == 204) {
        setErrMsg(`No refresh token was supplied`);
        return;
      }
      clearShoppingCart();
      setAuth(null);
    } catch (error) {
      setErrMsg("Could not reach server");
      return;
    }
  };

  const clearErrMsg = () => {
    setErrMsg("");
  };

  return { sendLogoutRequest, errMsg, clearErrMsg };
}

export default useLogout;
