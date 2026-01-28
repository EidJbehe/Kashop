import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import NavLogo from './navbarImages/Logo-navbar.svg';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/AuthStore';

// ======= Search Styles =======
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F2F2F2',
  '&:hover': { backgroundColor: '#E8E8E8' },
  marginRight: theme.spacing(2),
  width: '100%',
  maxWidth: 300,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#8C8C8C',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#333333',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

// ======= Styled NavLink =======
const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: '#000',
  fontWeight: 600,
  fontSize: '16px',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#FF5722',
    transform: 'scale(1.05)',
  },
  '&::after': {
    content: '""',
    display: 'block',
    height: 2,
    background: '#FF5722',
    width: 0,
    transition: 'width 0.3s',
    position: 'absolute',
    bottom: -2,
    left: 0,
  },
  '&:hover::after': {
    width: '100%',
  },
}));

export default function Navbar() {
  const [mobileAnchor, setMobileAnchor] = useState(null);
  const isMobileOpen = Boolean(mobileAnchor);
const token = useAuthStore((state) => state.token);
const logout = useAuthStore((state) => state.logout);


  const handleMobileOpen = (event) => setMobileAnchor(event.currentTarget);
  const handleMobileClose = () => setMobileAnchor(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#fff', color: '#000' }}>
        <Toolbar sx={{ p: 0, minHeight: 64, px: 2 }}>
          {/* Logo */}
          <Box component="img" sx={{ height: 40, flexShrink: 0, mr: 2 }} src={NavLogo} alt="Logo" />

          {/* Desktop Search */}
          <Search sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>

            {token ? (
              <>
                {/* Icons */}
                <IconButton component={Link} to="/favorites" size="large" aria-label="Favorites">
                  <Badge badgeContent={2} color="error">
                    <FavoriteIcon sx={{ color: '#000' }} />
                  </Badge>
                </IconButton>

                <IconButton component={Link} to="/cart" size="large" aria-label="Cart">
                  <Badge badgeContent={3} color="error">
                    <ShoppingCartIcon sx={{ color: '#000' }} />
                  </Badge>
                </IconButton>

                <IconButton
                  size="large"
                  aria-label="Logout"
                  onClick={logout}
                  sx={{ color: '#000' }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Sign Up</NavLink>
              </>
            )}
          </Box>

          {/* Mobile Icons + Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            {token && (
              <>
                <IconButton component={Link} to="/favorites" size="large" aria-label="Favorites">
                  <Badge badgeContent={2} color="error">
                    <FavoriteIcon sx={{ color: '#000' }} />
                  </Badge>
                </IconButton>

                <IconButton component={Link} to="/cart" size="large" aria-label="Cart">
                  <Badge badgeContent={3} color="error">
                    <ShoppingCartIcon sx={{ color: '#000' }} />
                  </Badge>
                </IconButton>

                <IconButton
                  size="large"
                  aria-label="Logout"
                  onClick={logout}
                  sx={{ color: '#000' }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            )}

            <IconButton
              size="large"
              aria-label="open menu"
              onClick={handleMobileOpen}
              color="inherit"
            >
              <MenuIcon sx={{ color: '#000' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Dropdown */}
      <Menu
        anchorEl={mobileAnchor}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileOpen}
        onClose={handleMobileClose}
      >
        <MenuItem component={Link} to="/home" onClick={handleMobileClose}>
          <Typography textAlign="center">Home</Typography>
        </MenuItem>

        <MenuItem component={Link} to="/about" onClick={handleMobileClose}>
          <Typography textAlign="center">About</Typography>
        </MenuItem>

        <MenuItem component={Link} to="/contact" onClick={handleMobileClose}>
          <Typography textAlign="center">Contact Us</Typography>
        </MenuItem>

        {!token && (
          <MenuItem component={Link} to="/login" onClick={handleMobileClose}>
            <Typography textAlign="center">Login</Typography>
          </MenuItem>
        )}

        {!token && (
          <MenuItem component={Link} to="/register" onClick={handleMobileClose}>
            <Typography textAlign="center">Sign Up</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
