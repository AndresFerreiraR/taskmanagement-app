import { Avatar, List, ListItem, ListItemText } from "@mui/material";
import IAuthenticatedUser from "../../../models/users/IAuthenticatedUser";
import { Link } from "react-router-dom";
import FotoUsuario from "../../../assets/react.svg";
import '../../../common/styles/navBarStyles.css'

interface RightMenuProps {
    logOut: () => void;
    user?: IAuthenticatedUser;
  }
  
  const RightMenu: React.FC<RightMenuProps> = ({ logOut, user }) => (
    <div className={`width: 250`}>
      <List>
        <ListItem component={Link} to="#">
          <Avatar src={FotoUsuario} />
          <ListItemText
            classes={{ primary: 'listItemText' }}
            primary={user ? user.fullName : null}
          />
        </ListItem>
        <ListItem button onClick={logOut}>
          <ListItemText classes={{ primary: 'listItemText' }} primary="Salir" />
        </ListItem>
      </List>
    </div>
  );
  
  export default RightMenu;