import Login from "./pages/Login.tsx";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import useAuth from "./hooks/useAuth.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import Admin from "./pages/Admin.tsx";
import Register from "./pages/Register.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import Inventory from "./pages/Inventory.tsx";
import { Stack } from "@mui/material";
import {
  ADMIN_LINK,
  INVENTORY_EDIT_LINK,
  INVENTORY_LINK,
  LOGIN_LINK,
  PURCHASE_EDIT_LINK,
  PURCHASE_HISTORY_LINK,
  REGISTER_LINK,
} from "./data/LinkConstants.tsx";
import useRefreshToken from "./hooks/useRefreshToken.tsx";
import { useEffect, useState } from "react";
import PurchaseHistory from "./pages/PurchaseHistoryListPage.tsx";
import EditPurchaseHistoryPage from "./pages/EditPurchaseHistoryPage.tsx";
import EditInventoryItemPage from "./pages/EditInventoryItemPage.tsx";

//https://react.dev/learn/you-might-not-need-an-effect#initializing-the-application
let didInit = false;
function App() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<Boolean>(true);
  
  useEffect(() => {
    const refreshAccess = async () => {
      const from = location.pathname || "/";
      const searchParams = location.search || "";
      try{
        await refresh();
        setLoading(false);
        navigate({ pathname: from, search: searchParams }, { replace: true });
      }
      catch(e){
        setLoading(false);
      }
    };
    if (!didInit) {
      didInit = true;
      refreshAccess();
    }
  }, []);

  const isLoggedIn = auth;
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <NavBar />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        marginY={8}
      >
        <Routes>
          <Route
            path={LOGIN_LINK.link}
            element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path={REGISTER_LINK.link}
            element={!isLoggedIn ? <Register /> : <Navigate to="/" replace />}
          />
          <Route element={<RequireAuth />}>
            <Route path={ADMIN_LINK.link} element={<Admin />} />
            <Route path={INVENTORY_LINK.link} element={<Inventory />} />
            <Route path={INVENTORY_EDIT_LINK.link} element={<EditInventoryItemPage />} />
            <Route path={PURCHASE_HISTORY_LINK.link} element={<PurchaseHistory />} />
            <Route path={PURCHASE_EDIT_LINK.link} element={<EditPurchaseHistoryPage />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Stack>
    </>
  );
}

export default App;
