import { FunctionComponent } from "react";
import useAuth from "src/hooks/useAuth";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {
  ACCOUNT_LINK,
  LOGIN_LINK,
  REGISTER_LINK,
} from "src/data/LinkConstants";
import CustomMenu, { CustomMenuItem } from "src/components/CustomMenu";
import PopoutCustomMenu from "src/components/PopoutCustomMenu";
import useLogout from "src/hooks/useLogout";

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  const { auth } = useAuth();
  const isLoggedIn = auth;
  const { sendLogoutRequest } = useLogout();
  const loggedInSettings: CustomMenuItem[] = [
    {
      type: "Link",
      ...ACCOUNT_LINK,
      icon: <ManageAccountsIcon sx={{ mr: 1 }} />,
    },
    {
      type: "Action",
      title: "Logout",
      action: () => sendLogoutRequest(),
      icon: <LogoutIcon sx={{ mr: 1 }} />,
    },
  ];

  const loggedOutSettings: CustomMenuItem[] = [
    {
      type: "Link",
      ...LOGIN_LINK,
      icon: <LoginIcon sx={{ mr: 1 }} />,
    },
    {
      type: "Link",
      ...REGISTER_LINK,
      icon: <AppRegistrationIcon sx={{ mr: 1 }} />,
    },
  ];

  if (isLoggedIn)
    return (
      <PopoutCustomMenu
        menuItems={loggedInSettings}
        tooltip="Open Settings"
        openButton={<SettingsIcon />}
      />
    );

  return <CustomMenu menuItems={loggedOutSettings} />;
};

export default Settings;
