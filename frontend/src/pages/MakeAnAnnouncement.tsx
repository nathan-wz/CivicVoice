import AnnouncementForm from "../components/AnnouncementForm";
import SideMenu from "../components/SideMenu";

function MakeAnAnnouncement() {
    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <div className="section-heading">
                    <h1>Make an announcement</h1>
                    <p>
                        Let your community know <br /> what you've been up to
                    </p>
                </div>
                <AnnouncementForm />
            </div>
        </div>
    );
}

export default MakeAnAnnouncement;
