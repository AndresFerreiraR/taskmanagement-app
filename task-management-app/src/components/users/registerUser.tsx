import React, { useState } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import Style from "../../common/styles/style";
import IUser from "../../models/users/IUser";

const RegisterUser = () => {

  const initialState: IUser = {
    UserName: '',
    Email: '',
    Token: '',
    FirstName: '',
    MiddleInitial: '',
    LastName: '',
    Password: '',
};

const [user, setUser] = useState(initialState);

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
              label="FirstName"
              variant="outlined"
              name="FirstName"
              value={user.FirstName}
              onChange={setMemoryValue}
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="type your middlename"
              variant="outlined"
              name="MiddleInitial"
              value={user.MiddleInitial}
              onChange={setMemoryValue}
            />
          </Grid> */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="LastName"
              variant="outlined"
              name="MiddleInitial"
              value={user.MiddleInitial}
              onChange={setMemoryValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="Email"
              type="email"
              value={user.Email}
              onChange={setMemoryValue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="UserName"
              variant="outlined"
              name="UserName"
              value={user.UserName}
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
              value={user.Password}
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