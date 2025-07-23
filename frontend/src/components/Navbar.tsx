import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="z-999 sticky top-0 h-15 px-2 bg-primary flex justify-between items-center ">
            <div>
                <div></div>
                <div className="text-secondary-alt">CivicVoice</div>
            </div>

            <div>
                <Link to="/login" className="nav-btn">
                    Login
                </Link>
                <Link to="/register" className="nav-btn">
                    Register
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
