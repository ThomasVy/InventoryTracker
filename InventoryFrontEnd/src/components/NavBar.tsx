import useAuth from "../hooks/useAuth";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link as RouterLink } from "react-router-dom";
import useLogout from "src/hooks/useLogout";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

interface Link {
  title: string;
  link: string;
}

interface Settings extends Link {
  icon: JSX.Element;
}
const commonLinks: Link[] = [{ title: "Home", link: "/" }];

const signedInPages: Link[] = [
  ...commonLinks,
  { title: "Admin", link: "/admin" },
  { title: "Inventory", link: "/inventory" },
];

const signedOutPages: Link[] = [...commonLinks];

const loggedInSettings: Settings[] = [
  {
    title: "Account",
    link: "/account",
    icon: <ManageAccountsIcon sx={{ mr: 1 }} />,
  },
];

const loggedOutSettings: Settings[] = [
  { title: "Login", link: "/login", icon: <LoginIcon sx={{ mr: 1 }} /> },
  {
    title: "Register",
    link: "/register",
    icon: <AppRegistrationIcon sx={{ mr: 1 }} />,
  },
];

function Settings() {
  const { auth } = useAuth();
  const isLoggedIn = auth;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { sendLogoutRequest, errMsg } = useLogout();
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  if (isLoggedIn) {
    return (
      <>
        <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {loggedInSettings.map((setting) => (
              <MenuItem
                component={RouterLink}
                to={setting.link}
                key={setting.title}
                onClick={handleCloseUserMenu}
              >
                {setting.icon}
                <Typography textAlign="center">{setting.title}</Typography>
              </MenuItem>
            ))}
            <MenuItem onClick={() => sendLogoutRequest()}>
              <LogoutIcon sx={{ mr: 1 }} />
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </>
    );
  }

  return (
    <>
      {loggedOutSettings.map((setting) => (
        <MenuItem component={RouterLink} to={setting.link} key={setting.title}>
          {setting.icon}
          <Typography textAlign="center">{setting.title}</Typography>
        </MenuItem>
      ))}
    </>
  );
}

function Main() {
  const { auth } = useAuth();
  const isLoggedIn = auth;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const pages = isLoggedIn ? signedInPages : signedOutPages;
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem
              component={RouterLink}
              to={page.link}
              key={page.title}
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">{page.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.title}
            component={RouterLink}
            to={page.link}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page.title}
          </Button>
        ))}
      </Box>
    </>
  );
}
export default function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Main />
          <Settings />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
