import React, { useMemo, useState } from 'react';
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
import { Button, InputAdornment, TextField } from '@mui/material';
import NavLogo from './navbarImages/Logo-navbar.svg';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/AuthStore';
import { useTranslation } from 'react-i18next';
import useThemeStore from '../../store/useThemeStore';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import LightModeIcon from '@mui/icons-material/LightMode';

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
  const user = useAuthStore((state) => state.user);
  const handleMobileOpen = (event) => setMobileAnchor(event.currentTarget);
  const handleMobileClose = () => setMobileAnchor(null);
  const { t, i18n } = useTranslation();

  const toggleLanguage = (lng) => {
    lng = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(lng);
  };
  
  const themeMode = useThemeStore((state) => state.themeMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const searchInputProps = useMemo(
    () => ({
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{ color: '#8c8c8c' }} />
        </InputAdornment>
      ),
    }),
    []
  );
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#fff', color: '#000' }}>
        <Toolbar sx={{ p: 0, minHeight: 64, px: 2 }}>
          {/* Logo */}
          <Box component="img" sx={{ height: 40, flexShrink: 0, mr: 2 }} src={NavLogo} alt="Logo" />

          {/* Desktop Search */}
          <TextField
            size="small"
            placeholder={t('Search')}
            sx={{
              mx: 2,
              display: { xs: 'none', md: 'flex' },

              width: 300,
              backgroundColor: '#f2f2f2',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#d6d6d6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#bdbdbd',
                },
              },
            }}
            InputProps={searchInputProps}
          />

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
            <NavLink to="/home">{t('Home')}</NavLink>
            <NavLink to="/about">{t('About')}</NavLink>
            <NavLink to="/contact">{t('Contact')}</NavLink>

            {token && user ? (
              <>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '15px',
                    color: '#444',
                    mr: 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  👋 {t('Welcome')},&nbsp;
                  <Box component="span" sx={{ color: '#FF5722' }}>
                    {user.name}
                  </Box>
                </Typography>
                {/* Icons */}
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
                <Button
                  onClick={toggleLanguage}
                  sx={{
                    width: 38,
                    height: 38,
                    minWidth: 38,
                    borderRadius: '50%',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#444',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e5e5e5',
                    '&:hover': {
                      backgroundColor: '#ededed',
                    },
                  }}
                >
                  {i18n.language === 'en' ? 'AR' : 'EN'}
                </Button>

                <Button
                  onClick={toggleTheme}
                  sx={{
                    width: 38,
                    height: 38,
                    minWidth: 38,
                    borderRadius: '50%',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#444',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e5e5e5',
                    '&:hover': {
                      backgroundColor: '#ededed',
                    },
                  }}
                >
                  {themeMode === 'light' ? 'light' : 'dark'}
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/login">{t('Login')}</NavLink>
                <NavLink to="/register">{t('Register')}</NavLink>
                <Button
                  onClick={toggleLanguage}
                  sx={{
                    width: 38,
                    height: 38,
                    minWidth: 38,
                    borderRadius: '50%',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#444',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e5e5e5',
                    '&:hover': {
                      backgroundColor: '#ededed',
                    },
                  }}
                >
                  {i18n.language === 'en' ? 'AR' : 'EN'}
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Icons + Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            {token && (
              <>
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
          <Typography textAlign="center">{t('Home')}</Typography>
        </MenuItem>

        <MenuItem component={Link} to="/about" onClick={handleMobileClose}>
          <Typography textAlign="center">{t('About')}</Typography>
        </MenuItem>

        <MenuItem component={Link} to="/contact" onClick={handleMobileClose}>
          <Typography textAlign="center">{t('Contact')}</Typography>
        </MenuItem>

        {!token && (
          <MenuItem component={Link} to="/login" onClick={handleMobileClose}>
            <Typography textAlign="center">{t('Login')}</Typography>
          </MenuItem>
        )}

        {!token && (
          <MenuItem component={Link} to="/register" onClick={handleMobileClose}>
            <Typography textAlign="center">{t('Register')}</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
