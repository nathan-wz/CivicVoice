import { Link } from "react-router-dom";

function SideMenu() {
    return (
        <div className="px-5 py-15 self-start sticky top-0 flex flex-col">
            <Link to="/" className="sidemenu-button">
                Home
            </Link>
            <Link to="/issues" className="sidemenu-button">
                Issues
            </Link>
            <Link to="/announcements" className="sidemenu-button">
                Announcements
            </Link>
            <Link to="/post-an-issue" className="sidemenu-button">
                Post an Issue
            </Link>
            <Link to="/make-an-announcement" className="sidemenu-button">
                Make an <br /> announcement
            </Link>
        </div>
    );
}

export default SideMenu;
