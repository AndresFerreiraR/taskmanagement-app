import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
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


const Login = () => {
  const userInputsProps = {
    emailOrUser: '',
    password: ''
  };

  const userAction = new UserActions();
  const [userInputs, setUserInputs] = useState(userInputsProps);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

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
    console.log("Inputs", userInputs);
    let updatedLoginData: ILoginUser;
    if (userInputs.emailOrUser.includes("@")) {
      console.log("Entra por email");
      updatedLoginData = {
        email: userInputs.emailOrUser,
        password: userInputs.password,
        userName: ''
      };
    } else {
      console.log("Entra por usuario");
      updatedLoginData = {
        email: '',
        password: userInputs.password,
        userName: userInputs.emailOrUser
      };
    }
    console.log("el contendido del updatedLoginData es ", updatedLoginData)
    await callActionAuthenticate(updatedLoginData);
  };

  const callActionAuthenticate = async (user: ILoginUser) => {
    console.log("Esto es desde el componente login", user);
    const response = await userAction.AuthenticateUser(user);
    console.log("Se supone que hizo el request y la respuesta es", response);
    if(response && response.isSuccess){
      console.log("entro al if", response)
      dispatch(login(response.data));
      dispatch(openSnackbar("User successfully logged in"));
      window.localStorage.setItem("userToken", response.data.token);
      console.log("valor del dispatch", response.data)
    }else{
      console.log("NO se que mierda estoy haciendo");
    }
  }


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
        </form>
      </div>
    </Container>
  );
};

export default Login;
