
import Login from './pages/Login.tsx'
import { Routes, Route, NavLink, Outlet, Navigate } from "react-router-dom";
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import "./styles.css"
import Logout from './pages/Logout.tsx';
import useAuth from './hooks/useAuth.tsx';
import RequireAuth from './components/RequireAuth.tsx';
import Admin from './pages/Admin.tsx';
import { useEffect, useState } from 'react';
import useRefreshToken from "./hooks/useRefreshToken";
import { useLocation, useNavigate } from "react-router-dom";
import Register from './pages/Register.tsx';
import NavBar from './components/NavBar.tsx';
import Inventory from './pages/Inventory.tsx';

//https://react.dev/learn/you-might-not-need-an-effect#initializing-the-application
let didInit = false;

function App() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const refreshAccess = async () =>
    {
      const from = location.pathname || "/";
      await refresh();
      setLoading(false);
      navigate(from, { replace: true });
    }
    if (!didInit) {
      didInit = true;
      refreshAccess();
    }
  }, []);

  const isLoggedIn = auth;
  if (isLoading)
  {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <Routes>
        <Route element={<NavBar />}>
            <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" replace /> }/>
            <Route path="/logout" element={isLoggedIn ? <Logout /> : <Navigate to="/" replace /> }/>
            <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" replace /> } />
            <Route element={<RequireAuth/>}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/inventory" element={<Inventory />} />
            </Route>

            <Route path="/" element={<Home />}/>
            <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;