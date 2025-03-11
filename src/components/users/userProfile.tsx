import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import Style from "../../common/styles/style";
import IUser from "../../models/users/IUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/reducers";
import UserActions from "../../actions/userActions";
import { openSnackbar } from "../../context/reducers/snackbarReducer";

const UserProfile = () => {

  const initialState: IUser = {
    id: '',
    userName: '',
    email: '',
    token: '',
    firstName: '',
    middleInitial: '',
    lastName: '',
    password: '',
};

const [user, setUser] = useState<IUser>(initialState);
const userAction = new UserActions();
const userSesionState = useSelector((state: RootState) => state.userSesionState);
const dispatch = useDispatch();

useEffect(() => {
 getCurrentUserSesion()
}, [])

const getCurrentUserSesion = async () => {
  console.log("Esto es desde el componente UserProfile", user);
  const response = await userAction.GetUserById(userSesionState.user.id);
  console.log("Se supone que hizo el request desde UserProfile y la respuesta es", response);
  if(response && response.isSuccess){
    console.log("entro al if", response)
    setUser(response.data);
    dispatch(openSnackbar("Current data successful"));
    console.log("valor del dispatch", response.data)
  }else{
    console.log("NO se que mierda estoy haciendo");
  }
}
const setMemoryValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setUser(previous => ({
    ...previous,
    [name]: value
  }))
};


  return (
    <Container maxWidth="md">
      <div style={Style.paper}>
        <Typography component="h1" variant="h5">
          Perfil Usuario
        </Typography>
      </div>
      <form style={Style.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre(s)"
              variant="outlined"
              name="firstName"
              value={user.firstName}
              onChange={setMemoryValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Apellido(s)"
              variant="outlined"
              name="lastName"
              value={user.lastName}
              onChange={setMemoryValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              disabled
              value={user.email}
              onChange={setMemoryValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="UserName"
              disabled
              variant="outlined"
              name="userName"
              value={user.userName}
              onChange={setMemoryValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={user.password}
              onChange={setMemoryValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              name="confirmarPassword"
              // value={user.confirmarPassword}
              onChange={setMemoryValue}
            />
          </Grid>
        </Grid>
        <Grid justifyContent="center">
          <Grid item xs={12} md={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              style={Style.submit}
              //onClick={userRegisterButton}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserProfile;