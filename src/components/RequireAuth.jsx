import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData, selectUserLoading } from "../redux/user/selectors";
export const RequireAuth = ({ children }) => {
  const user = useSelector(selectUserData);
  const loading = useSelector(selectUserLoading);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.id) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};
