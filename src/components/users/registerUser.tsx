import React, { FC, useState } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import Style from "../../common/styles/style";
import IUser from "../../models/users/IUser";
import UserActions from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../context/reducers/snackbarReducer";
import { RegisterUserProps } from "../types";

const RegisterUser: FC<RegisterUserProps> = ({onClose}) => {

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
const dispatch = useDispatch();

const setMemoryValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setUser(previous => ({
    ...previous,
    [name]: value
  }))
};


const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const response = await userAction.RegisterNewUser(user);
    if(response.isSuccess){
      dispatch(openSnackbar("Usuario Creado Correctamente"));
    }
    onClose();
  };


  return (
    <Container maxWidth="md">
      <div style={Style.paper}>
        <Typography component="h1" variant="h5">
          Registro de usaurio
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
              value={user.email}
              onChange={setMemoryValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="UserName"
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
              onClick={handleSubmit}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterUser;