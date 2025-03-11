import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";
import { RootState } from "../../context/reducers";

interface SafeRouteProps {
    element: React.ReactElement;
    path: string;
    exact?: boolean;
  }
  
  const SafeRoute: React.FC<SafeRouteProps> = ({ element, ...rest }) => {
    const userSesionState = useSelector((state: RootState) => state.userSesionState);
    
    return (
        <Route
        {...rest}
        element={
            userSesionState && userSesionState.authenticated ? (
            element
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />
    );
  };
  
  export default SafeRoute;