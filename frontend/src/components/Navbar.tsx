import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="z-999 sticky top-0 h-15 px-2 bg-primary flex justify-between items-center">
            <Link to="/landing" className="text-secondary-alt font-bold">
                CivicVoice
            </Link>

            <div className="space-x-3">
                {isAuthenticated ? (
                    <button
                        onClick={logout}
                        className="nav-btn bg-red-500 hover:bg-red-600 text-white"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="nav-btn">
                            Login
                        </Link>
                        <Link to="/register" className="nav-btn">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
