import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, Outlet } from 'react-router-dom';

const drawerWidth = 240;

export default function ProfileLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="">
            <ListItemText primary="Info" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="orders">
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              position: 'fixed',
              top: '64px',
              height: 'calc(100% - 64px)',
              borderRight: 'none',
              boxShadow: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar />

        <IconButton onClick={handleDrawerToggle} sx={{ display: { sm: 'none' }, mb: 2 }}>
          <MenuIcon />
        </IconButton>

        <Outlet />
      </Box>
    </Box>
  );
}

ProfileLayout.propTypes = {
  window: PropTypes.func,
};
