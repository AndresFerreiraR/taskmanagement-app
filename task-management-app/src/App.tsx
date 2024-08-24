import { ThemeProvider } from "@mui/material";
import "./App.css";
import RegisterUser from "./components/users/registerUser";
import theme from "./common/theme/theme";
import Login from "./components/users/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskComponent from "./components/taskComponent";
//import TaskFormComp from "./components/taskFormComp";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/auth/login" element={<Login/>} />
            <Route path="/auth/RegisterUser" element={<RegisterUser/>} />
            <Route path="/task/Dashboard" element={<TaskComponent/>} />
          </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
