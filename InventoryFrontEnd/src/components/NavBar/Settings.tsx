import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import useAuth from "src/hooks/useAuth";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as RouterLink } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {
  ACCOUNT_LINK,
  LOGIN_LINK,
  Link,
  REGISTER_LINK,
} from "src/data/LinkConstants";
import useLogout from "src/hooks/useLogout";
import AlertMsg from "../Alert";

interface Settings extends Link {
  icon: JSX.Element;
}

const loggedInSettings: Settings[] = [
  { ...ACCOUNT_LINK, icon: <ManageAccountsIcon sx={{ mr: 1 }} /> },
];

const loggedOutSettings: Settings[] = [
  { ...LOGIN_LINK, icon: <LoginIcon sx={{ mr: 1 }} /> },
  { ...REGISTER_LINK, icon: <AppRegistrationIcon sx={{ mr: 1 }} /> },
];

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  const { auth } = useAuth();
  const isLoggedIn = auth;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { sendLogoutRequest, errMsg, clearErrMsg } = useLogout();
  const handleCloseUserMenu = () => {
    clearErrMsg();
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
            <IconButton onClick={handleOpenUserMenu}>
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
            <AlertMsg title="Logout Failed" message={errMsg} severity="error" />
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
};

export default Settings;
