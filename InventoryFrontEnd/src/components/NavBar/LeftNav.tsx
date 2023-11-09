import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import { ADMIN_LINK, HOME_LINK, INVENTORY_LINK, Link } from "src/data/LinkConstants";
import useAuth from "src/hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const commonLinks: Link[] = [HOME_LINK];

const signedInPages: Link[] = [
  ...commonLinks,
  ADMIN_LINK,
  INVENTORY_LINK,
];

const signedOutPages: Link[] = [...commonLinks];

function LeftNav() {
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

export default LeftNav;
