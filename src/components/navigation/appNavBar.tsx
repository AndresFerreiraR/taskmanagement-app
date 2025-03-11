import { useSelector } from "react-redux";
import { RootState } from "../../context/reducers";
import AppBar from "@mui/material/AppBar";
import SesionNavBar from "./navBar/sesionNavBar";

const AppNavBar = () => {
    const userSesionState = useSelector((state: RootState) => state.userSesionState);
  
    return userSesionState ? (
        userSesionState.authenticated === true ? (
        <AppBar position="static">
            <SesionNavBar/>
        </AppBar>
      ) : null
    ) : null;
  };
  
  export default AppNavBar;