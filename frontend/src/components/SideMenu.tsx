function SideMenu() {
    return (
        <div className="px-5 py-15 self-start sticky top-0 flex flex-col">
            <button className="sidemenu-button">Home</button>
            <button className="sidemenu-button">Issues</button>
            <button className="sidemenu-button">Announcements</button>
            <button className="sidemenu-button">Post an Issue</button>
            <button className="sidemenu-button">Profile</button>
        </div>
    );
}

export default SideMenu;
