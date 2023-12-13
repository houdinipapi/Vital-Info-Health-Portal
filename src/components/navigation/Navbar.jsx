import  { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { routes } from '../../../cache/storage';



const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 200,
      }}
      onClick={handleDrawerClose}
      onKeyDown={handleDrawerClose}
    >
      <List>
        {routes.map((route) => (
          <Link key={route.path} to={route.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemText primary={route.pathname} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ❤️‍🩹 Hospital Name
        </Typography>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
            {drawerContent}
          </Drawer>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {routes.map((route) => (
            <Link key={route.path} to={route.path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">{route.pathname}</Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
