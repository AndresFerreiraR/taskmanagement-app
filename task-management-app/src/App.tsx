import { ThemeProvider } from "@mui/material";
import RegisterUser from "./components/users/registerUser";
import theme from "./common/theme/theme";
import Login from "./components/users/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskComponent from "./components/dashboard/task/TaskComponent";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/auth/login" Component={Login} />
            <Route path="/auth/RegisterUser" Component={RegisterUser} />
            <Route path="/dashboard/task" Component={TaskComponent} />
          </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
