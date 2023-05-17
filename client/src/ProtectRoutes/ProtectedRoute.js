import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
      if(loading===false){
        if (!isAuthenticated) {
          return <Navigate to="/login" replace />;
        } 
        return children;
      }
};

export default ProtectedRoute;
