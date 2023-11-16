import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { Link } from "src/data/LinkConstants";
import { Link as RouterLink } from "react-router-dom";

export interface CustomLinkMenuItem extends Link {
  type: "Link";
  icon?: JSX.Element;
}

export interface CustomActionLinkMenuItem {
  type: "Action";
  icon?: JSX.Element;
  title: string;
  action: () => void;
}
export type CustomMenuItem = CustomLinkMenuItem | CustomActionLinkMenuItem;

interface PopoutCustomMenuProps {
  menuItems: CustomMenuItem[];
  tooltip: string;
  openButton: JSX.Element;
}

const PopoutCustomMenu: FunctionComponent<PopoutCustomMenuProps> = ({
  menuItems,
  tooltip,
  openButton,
}) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <>
      <Tooltip title={tooltip}>
        <IconButton onClick={handleOpenUserMenu}>{openButton}</IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
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
        {menuItems.map((menuItem) => {
          switch (menuItem.type) {
            case "Action":
              return (
                <MenuItem key={menuItem.title} onClick={menuItem.action}>
                  {menuItem.icon}
                  <Typography textAlign="center">{menuItem.title}</Typography>
                </MenuItem>
              );
            case "Link":
              return (
                <MenuItem
                  component={RouterLink}
                  to={menuItem.link}
                  key={menuItem.title}
                  onClick={handleCloseUserMenu}
                >
                  {menuItem.icon}
                  <Typography textAlign="center">{menuItem.title}</Typography>
                </MenuItem>
              );
          }
        })}
      </Menu>
    </>
  );
};

export default PopoutCustomMenu;
