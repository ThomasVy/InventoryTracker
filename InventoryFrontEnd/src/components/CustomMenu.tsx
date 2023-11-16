import { MenuItem, Typography } from "@mui/material";
import { FunctionComponent } from "react";
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

interface CustomMenuProps {
  menuItems: CustomMenuItem[];
}

const CustomMenu: FunctionComponent<CustomMenuProps> = ({ menuItems }) => {
  return (
    <>
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
              >
                {menuItem.icon}
                <Typography textAlign="center">{menuItem.title}</Typography>
              </MenuItem>
            );
        }
      })}
    </>
  );
};

export default CustomMenu;
