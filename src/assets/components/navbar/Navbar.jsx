import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import NavLogo from "./navbarImages/Logo-navbar.svg";
import { useNavigate } from "react-router-dom";

// Search Style
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F2F2F2",
  "&:hover": { backgroundColor: "#E8E8E8" },
  marginRight: theme.spacing(2),
  width: "100%",
  maxWidth: 300,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#8C8C8C",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#333333",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

export default function Navbar() {
    const navigate = useNavigate();
  const [mobileAnchor, setMobileAnchor] = useState(null);

  const links = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Login", path: "/login" },
  { name: "Sign Up", path: "/register" },
];
  const isMobileOpen = Boolean(mobileAnchor);

  const handleMobileOpen = (event) => setMobileAnchor(event.currentTarget);

  const handleMobileClose = () => setMobileAnchor(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Toolbar sx={{ p: 0, minHeight: 64, px: 2 }}>
          {/* Navbar Logo */}
          <Box component="img" sx={{ height: 40, flexShrink: 0, mr: 2 }} src={NavLogo} alt="Logo" />

          {/* Desktop Search */}
          <Search sx={{ display: { xs: "none", sm: "flex" } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            {links.map((link) => (
  <Button
    key={link.name}
    onClick={() => navigate(link.path)}
    sx={{
      color: "#000",
      textTransform: "none",
      fontWeight: 500,
      "&:hover": { backgroundColor: "transparent", color: "#FF5722" },
    }}
  >
    {link.name}
  </Button>
))}


            {/* Icons */}
            <IconButton size="large" aria-label="Favorites" color="inherit">
              <Badge badgeContent={2} color="error">
                <FavoriteIcon sx={{ color: "#000" }} />
              </Badge>
            </IconButton>

            <IconButton size="large" aria-label="Cart" color="inherit">
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon sx={{ color: "#000" }} />
              </Badge>
            </IconButton>
          </Box>

          {/* Mobile Icons + Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
            <IconButton size="large" aria-label="Favorites" color="inherit">
              <Badge badgeContent={2} color="error">
                <FavoriteIcon sx={{ color: "#000" }} />
              </Badge>
            </IconButton>

            <IconButton size="large" aria-label="Cart" color="inherit">
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon sx={{ color: "#000" }} />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="open menu"
              onClick={handleMobileOpen}
              color="inherit"
            >
              <MenuIcon sx={{ color: "#000" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Dropdown */}
      <Menu
        anchorEl={mobileAnchor}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileOpen}
        onClose={handleMobileClose}
      >
        {links.map((link) => (
  <MenuItem
    key={link.name}
    onClick={() => {
      navigate(link.path);
      handleMobileClose();
    }}
  >
    <Typography textAlign="center">{link.name}</Typography>
  </MenuItem>
))}

      </Menu>
    </Box>
  );
}
