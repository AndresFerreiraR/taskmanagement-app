import React, { useState } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import Style from "../../common/styles/style";
import IUser from "../../models/users/IUser";

const RegisterUser = () => {

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

const setMemoryValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setUser(previous => ({
    ...previous,
    [name]: value
  }))
};

// const userRegisterButton = e => {
//   e.preventDefault();
//   userRegisterMC(user).then(response => {
//     window.localStorage.setItem("userToken", response.data.token);
//   });
// }

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

export default RegisterUser;