
import Login from './components/Login.tsx'
import { Routes, Route, NavLink, Outlet, Navigate } from "react-router-dom";
import Home from './components/Home.tsx';
import NotFound from './components/NotFound.tsx';
import "./styles.css"
import Logout from './components/Logout.tsx';
import useAuth from './hooks/useAuth.tsx';
import RequireAuth from './components/RequireAuth.tsx';
import OnlyLoggedInAccess from './components/OnlyLoggedInAccess.tsx';
import { useEffect } from 'react';
import useRefreshToken from "./hooks/useRefreshToken";
import { useLocation, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    const refreshAccess = async () =>
    {
      if (!didInit) {
        didInit = true;
        const from = location.pathname || "/";
        await refresh();
        navigate(from, { replace: true });
      }
    };
    refreshAccess();
  }, []);

  const isLoggedIn = auth;
  return (
    <>
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/login" element={isLoggedIn !== null ? <Navigate to="/" replace /> : <Login />}/>
          <Route path="/logout" element={isLoggedIn ? <Logout /> : <Navigate to="/" replace /> }/>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Home />}/>

          <Route element={<RequireAuth/>}>
            <Route path="/admin" element={<OnlyLoggedInAccess />} />
          </Route>

          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;