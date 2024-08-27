
import { Divider, List, ListItem, ListItemText } from "@mui/material"
import { Link } from "react-router-dom";
import '../../../common/styles/navBarStyles.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuBookIcon from '@mui/icons-material/MenuBook';

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
          <ListItem component={Link} to="/project/Projects">
            <MenuBookIcon/>
            <ListItemText classes={{ primary: 'listItemText'}} primary="Lista proyectos" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem component={Link} to="/instructor/new">
            <i className="material-icons">person_add</i>
            <ListItemText classes={{ primary: 'listItemText'}} primary="Nuevo Instructor" />
          </ListItem>
          <ListItem component={Link} to="/instructor/lista">
            <i className="material-icons">people</i>
            <ListItemText classes={{ primary: 'listItemText'}} primary="Lista Instructor" />
          </ListItem>
        </List>
      </div>
    )
  }

export default LeftMenu;