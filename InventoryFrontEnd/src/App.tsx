
import Login from './components/Login.tsx'
import { Routes, Route, NavLink, Outlet, Navigate } from "react-router-dom";
import Home from './components/Home.tsx';
import NotFound from './components/NotFound.tsx';
import "./styles.css"
import Logout from './components/Logout.tsx';
import useAuth from './hooks/useAuth.tsx';
import RequireAuth from './components/RequireAuth.tsx';
import Admin from './components/Admin.tsx';
import { useEffect, useState } from 'react';
import useRefreshToken from "./hooks/useRefreshToken";
import { useLocation, useNavigate } from "react-router-dom";
import Register from './components/Register.tsx';

function NavBar()
{
  const { auth } = useAuth();
  const isLoggedIn = auth;

  const loggedInNav = () => {
    if (isLoggedIn)
    {
      return (
        <>
          <li>
            <NavLink to="/logout">Logout</NavLink>
            
          </li>
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
        </>
      );
    }
    return (
      <>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      </>
    )
  }
  return(
    <>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          {loggedInNav()}
        </ul>
      </nav>
      <Outlet />
    </>
  )
}

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
            </Route>

            <Route path="/" element={<Home />}/>
            <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;