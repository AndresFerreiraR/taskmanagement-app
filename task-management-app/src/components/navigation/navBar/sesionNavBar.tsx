import React, { useState } from "react";
import { Avatar, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../context/reducers";
import FotoUsuario from "../../../assets/react.svg";
import { logout } from "../../../context/reducers/userSesionReducer";
import LeftMenu from "./leftMenu";
import RightMenu from "./rightMenu";
import '../../../common/styles/navBarStyles.css'
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const SesionNavBar = () => {
    const navigate = useNavigate();
    const userSesionState = useSelector((state: RootState) => state.userSesionState);
    const [openLeftMenu, setOpenLeftMenu] = useState(false);
    const [openRightMenu, setOpenRightMenu] = useState(false);
    const dispatch = useDispatch();
    const closeLeftMenu = () => {
        setOpenLeftMenu(false);
    }

    const openLeftMenuAction = () => {
        setOpenLeftMenu(true);
    }

    const closeRightMenu = () => {
        setOpenRightMenu(false);
    }

    const logOutApp = () => {
        localStorage.removeItem('userToken');
        dispatch(logout());
        navigate('/auth/login');
    }

    const openRightMenuAction = () => {
        setOpenRightMenu(true);
    }
    
    return (
        <React.Fragment>
            <Drawer
                open={openLeftMenu}
                onClose={closeLeftMenu}
                anchor='left'
            >
                <div className={'list'} onKeyDown={closeLeftMenu} onClick={closeLeftMenu}>
                    <LeftMenu/>
                </div>
            </Drawer>
            <Drawer
                open={openRightMenu}
                onClose={closeRightMenu}
                anchor='right'
            >
                <div role='button' onClick={closeRightMenu} onKeyDown={closeRightMenu}>
                    <RightMenu
                        logOut={logOutApp}
                        user={userSesionState.user}
                    />
                </div>
            </Drawer>
            <Toolbar>
                <IconButton color="inherit" onClick={openLeftMenuAction}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant='h6'>
                    Cursos Online
                </Typography>
                <div className={'grow'}></div>
                <div className={'seccionDesktop'}>
                    <Button color='inherit' onClick={logOutApp}>
                        Salir
                    </Button>
                    <Button color='inherit'>
                        {userSesionState ? userSesionState.user.fullName : ''}
                    </Button>
                    <Avatar src={FotoUsuario}></Avatar>
                </div>

                <div className={'mobileSession'}>
                    <IconButton color='inherit' onClick={openRightMenuAction}>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </Toolbar>
        </React.Fragment>
    );
};

export default SesionNavBar;