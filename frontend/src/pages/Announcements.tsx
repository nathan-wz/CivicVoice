import Announcement from "../components/Announcement";
import SideMenu from "../components/SideMenu";

function Announcements() {
    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <div className="section-heading">
                    <h1>Announcements</h1>
                    <p>See what your community has to say</p>
                </div>
                <Announcement
                    title="Announcment title"
                    description="Annoucement description"
                    created="posted 2 days ago"
                />
                <Announcement
                    title="Announcment title"
                    description="Annoucement description"
                    created="posted 2 days ago"
                />
                <Announcement
                    title="Announcment title"
                    description="Annoucement description"
                    created="posted 2 days ago"
                />
            </div>
        </div>
    );
}

export default Announcements;
