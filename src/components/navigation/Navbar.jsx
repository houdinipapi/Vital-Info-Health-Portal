import { useContext, useState } from 'react';
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
import AuthContext from '../../context/auth/AuthContext';
import { routes, siteName } from '../../../storage/storage';

const Navbar = () => {
  const { auth } = useContext(AuthContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  const protectedRoutes = ["/auth/sign-in", "/auth/register"];

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const filteredRoutes = routes.filter((route) => {
    if (auth) {
      // Display all routes for authenticated users
      return !protectedRoutes.includes(route.path) || !auth
    } else {
      // Display only 'Sign In' and 'Register' routes for unauthenticated users
      return route.path === '/auth/sign-in' || route.path === '/auth/register';
    }
  });

  const drawerContent = (
    <Box
      sx={{
        width: 200,
      }}
      onClick={handleDrawerClose}
      onKeyDown={handleDrawerClose}
    >
      <List>
        {filteredRoutes.map((route) => (
          <Link key={route.path} to={route.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem>
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
         <Link to={"/"}>❤️‍🩹 {siteName}</Link>
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
          {filteredRoutes.map((route) => (
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
