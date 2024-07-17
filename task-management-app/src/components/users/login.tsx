import React from "react";
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Style from "../../common/styles/style";

const Login = () => {
  return (
    <Container maxWidth="xs">
      <div style={Style.paper}>
        <Avatar style={Style.avatar}>
          <LockPersonIcon style={Style.icon} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login De Usaurio
        </Typography>
        <form style={Style.form}>
          <TextField
            variant="outlined"
            label="Ingrese username"
            name="username"
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Ingrese password"
            name="password"
            fullWidth
            margin="normal"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={Style.submit}
          >
            LogIn
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
