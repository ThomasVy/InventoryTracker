import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface Link {
    title: string;
    link: string;
}

const signedInLinks : Link[] = [
    {title:"Logout", link:"/logout"},
    {title:"Admin", link:"/admin"},
    {title:"Inventory", link:"/inventory"},
]

const signedOutLinks: Link[] = [
    {title:"Login", link:"/login"},
    {title:"Register", link:"/register"},
]

export default function NavBar()
{
  const { auth } = useAuth();
  const isLoggedIn = auth;
  const loggedInNav = () => {
    const links = isLoggedIn ? signedInLinks : signedOutLinks;
    return (
        <>
            {
                links.map(
                (object : Link) => {
                    return (
                        <li key={object.title}>
                            <NavLink to={object.link}>{object.title}</NavLink>
                        </li>
                    );
                } )
            }
        </>
    );
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