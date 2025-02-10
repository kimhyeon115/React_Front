import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
    const sessionCookie = Cookies.get('JAVA_WEB_SESSION');

    if (!sessionCookie) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoute;