import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Style from "../../common/styles/style";
import ILoginUser from "../../models/users/ILoginUser";
import UserActions from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { login } from "../../context/reducers/userSesionReducer";
import { openSnackbar } from "../../context/reducers/snackbarReducer";
import { useNavigate } from 'react-router-dom';
import RegisterUser from "./registerUser";


const Login = () => {
  const userInputsProps = {
    emailOrUser: '',
    password: ''
  };

  const userAction = new UserActions();
  const [userInputs, setUserInputs] = useState(userInputsProps);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const validateEmail = (email: string) => {
    // Expresión regular simple para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const setUserLoginValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInputs((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "emailOrUser") {
      if (value.includes("@") && !validateEmail(value)) {
        setError("Por favor, ingrese un email válido.");
      } else {
        setError(null);
      }
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let updatedLoginData: ILoginUser;
    if (userInputs.emailOrUser.includes("@")) {
      updatedLoginData = {
        userEmail: userInputs.emailOrUser,
        password: userInputs.password,
        userName: ''
      };
    } else {
      updatedLoginData = {
        userEmail: '',
        password: userInputs.password,
        userName: userInputs.emailOrUser
      };
    }
    await callActionAuthenticate(updatedLoginData);
  };

  const callActionAuthenticate = async (user: ILoginUser) => {
    const response = await userAction.AuthenticateUser(user);
    if(response && response.isSuccess){
      dispatch(login(response.data));
      dispatch(openSnackbar("User successfully logged in"));
      window.localStorage.setItem("userToken", response.data.token);
      navigate('/');
    }else{
      console.log("NO se que mierda estoy haciendo");
    }
  }

  return (
    <React.Fragment>
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
            name="emailOrUser"
            label="Ingrese username o email"
            value={userInputs.emailOrUser}
            onChange={setUserLoginValues}
            fullWidth
            error={!!error}
            helperText={error}
          />
          <TextField
            variant="outlined"
            label="Ingrese password"
            name="password"
            fullWidth
            margin="normal"
            type="password"
            value={userInputs.password}
            onChange={setUserLoginValues}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={Style.submit}
            onClick={handleSubmit}
          >
            LogIn
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={Style.submit}
            onClick={() => {setOpen(true)}}
          >
            Registrarse
          </Button>
        </form>
      </div>
    </Container>
    <Dialog maxWidth='xl' open={open} onClose={() => setOpen(false)}>
        <RegisterUser onClose={() => setOpen(false)}/>
      </Dialog>
    </React.Fragment>
  );
};

export default Login;
