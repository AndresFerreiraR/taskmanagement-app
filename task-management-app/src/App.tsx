import { Grid, ThemeProvider } from "@mui/material";
import "./App.css";

import RegisterUser from "./components/users/registerUser";
import theme from "./common/theme/theme";
import Login from "./components/users/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskComponent from "./components/taskComponent";
//import TaskFormComp from "./components/taskFormComp";

const App = () => {
  // const [tasks, setTasks] = useState<Task[]>([]);

  // console.log("TASK", tasks);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Grid container>
          <Routes>
            <Route path="/auth/login" Component={Login} />
            <Route path="/auth/RegisterUser" Component={RegisterUser} />
            <Route path="/task/Dashboard" Component={TaskComponent} />
          </Routes>
        </Grid>
      </ThemeProvider>
    </Router>
  );
};

export default App;
