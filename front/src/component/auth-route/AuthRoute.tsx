import React, { useContext } from "react";
import { AuthContext } from "../../App";
import { Navigate } from "react-router-dom";

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext);
  console.log("isAuthenticated -->", auth?.state.isAuthenticated);
  // console.log(auth?.state);
  if (!auth) return <Navigate to="/" />;

  return <>{children}</>;
};

export default AuthRoute;