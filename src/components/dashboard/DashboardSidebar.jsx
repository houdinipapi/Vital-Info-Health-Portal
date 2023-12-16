import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../../../storage/storage';
import "../../styles/Sidebar.css"

const Sidebar = () => {
  return (
    <List className='sidebar-main' >
      {routes.map((route) => (
        <Link key={route.path} to={route.path} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button>
            <ListItemText primary={route.pathname} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default Sidebar;
