import { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import SideMenu from "../components/SideMenu";
import api from "../api";
import { Link } from "react-router-dom";

function Announcements() {
    const [announcements, setAnnouncements] = useState([
        {
            id: 1,
            title: "announcement title",
            description: "annoucement description",
            issueReference: "announcement issue reference",
        },
    ]);

    useEffect(() => {
        getAnnouncements();
    }, []);

    const getAnnouncements = () => {
        api.get("/api/announcements")
            .then((res) => res.data)
            .then((data) => {
                setAnnouncements(data);
                console.log(data);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <div className="section-heading">
                    <h1>Announcements</h1>
                    <p>See what your community has to say</p>
                </div>
                {announcements.map((announcement) => (
                    <Link to={`/announcement/${announcement.id}`}>
                        <Announcement
                            key={announcement.id}
                            announcement={announcement}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Announcements;
