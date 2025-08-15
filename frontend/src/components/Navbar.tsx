import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import userIcon from "../assets/icons/circle-user-solid-full.svg";
import { ACCESS_TOKEN } from "../constants";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const token = localStorage.getItem(ACCESS_TOKEN);
    const userId = token ? getUserIdFromToken(token) : null;

    return (
        <nav className="z-999 sticky top-0 h-15 px-2 bg-primary flex justify-between items-center">
            <Link to="/landing" className="text-secondary-alt font-bold">
                CivicVoice
            </Link>

            <div className="space-x-3">
                {isAuthenticated ? (
                    <div className="flex items-center space-x-1">
                        <Link to={`/profile/${userId}`}>
                            <FontAwesomeIcon
                                icon={faCircleUser}
                                size="2xl"
                                style={{ color: "#f4e89f" }}
                            />
                        </Link>
                        <button
                            onClick={logout}
                            className="nav-btn bg-red-500 hover:bg-red-600 text-white"
                        >
                            Logout
                        </button>
                    </div>
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
