import { Navigate, useLocation } from "react-router-dom";

interface ProtectedProps {
  children: React.ReactNode;
}

const ProtectedPages: React.FC<ProtectedProps> = ({ children }) => {
  const userAuthItem = localStorage.getItem("userAuth");
  const isAuthenticated = userAuthItem ? JSON.parse(userAuthItem) : false;
  const location = useLocation();
  console.log(location);
  
  console.log(isAuthenticated);

  return <>{isAuthenticated === false ? <Navigate to={`/login?redirect=${location.pathname}`} /> : children}</>;
};

export default ProtectedPages;
