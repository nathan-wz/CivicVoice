import AnnouncementForm from "../components/AnnouncementForm";
import SideMenu from "../components/SideMenu";
import announcementHeading2 from "../assets/images/announcement_heading_2.jpg";

function MakeAnAnnouncement() {
    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <div
                    className="section-heading"
                    style={{
                        backgroundImage: `linear-gradient(to right, black 0%, black 20%, transparent 100%), url('${announcementHeading2}')`,
                    }}
                >
                    <h1 className="text-secondary-alt">Make an announcement</h1>
                    <p className="text-secondary-alt">
                        Let your community know <br /> what you've been up to
                    </p>
                </div>
                <AnnouncementForm route="/api/announcements/" />
            </div>
        </div>
    );
}

export default MakeAnAnnouncement;
