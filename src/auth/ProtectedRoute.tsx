import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
    // path: string;
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        element
    ) : (
        <Navigate to="/login" replace />
    );
}; 

export default ProtectedRoute;