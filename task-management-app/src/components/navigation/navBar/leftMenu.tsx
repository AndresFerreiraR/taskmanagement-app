
import { Divider, List, ListItem, ListItemText } from "@mui/material"
import { Link } from "react-router-dom";
import '../../../common/styles/navBarStyles.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TaskIcon from '@mui/icons-material/Task';

const LeftMenu = () => {

    return (
        <div>
        <List>
          <ListItem component={Link} to="/auth/userProfile">
            <AccountBoxIcon/>
            <ListItemText classes={{ primary: 'listItemText'}} primary="Perfil" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem component={Link} to="/project/new">
            <AddBoxIcon/>
            <ListItemText classes={{ primary: 'listItemText'}} primary="Nuevo Proyecto" />
          </ListItem>
          <ListItem component={Link} to="/">
            <MenuBookIcon/>
            <ListItemText classes={{ primary: 'listItemText'}} primary="Lista proyectos" />
          </ListItem>
        </List>
        <Divider />
      </div>
    )
  }

export default LeftMenu;