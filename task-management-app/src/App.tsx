import { Snackbar, ThemeProvider } from "@mui/material";
import "./App.css";
import RegisterUser from "./components/users/registerUser";
import theme from "./common/theme/theme";
import Login from "./components/users/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskComponent from "./components/taskComponent";
import React from "react";
import AppNavBar from "./components/navigation/appNavBar";
import SafeRoute from "./components/navigation/safeRoute";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./context/reducers";
import { closeSnackbar } from "./context/reducers/snackbarReducer";
import UserProfile from "./components/users/userProfile";

const App = () => {
  const snackbarState = useSelector((state: RootState) => state.snackbarState);
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarState ? snackbarState.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={snackbarState ? snackbarState.message : ""}
        onClose={() =>
          dispatch(closeSnackbar())
        }
      />
      <Router>
        <ThemeProvider theme={theme}>
        <AppNavBar />
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/RegisterUser" element={<RegisterUser />} />
            <Route path="/auth/userProfile" element={<UserProfile />} />
            <Route path="/task/Dashboard" element={<TaskComponent />} />
            <Route element={<SafeRoute exact={true} path="/task/Dashboard" element={<TaskComponent />} />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;
