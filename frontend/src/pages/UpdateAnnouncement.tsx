import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type AnnouncementData } from "../types";
import api from "../api";
import SideMenu from "../components/SideMenu";
import AnnouncementForm from "../components/AnnouncementForm";
import announcementHeading2 from "../assets/images/announcement_heading_2.jpg";

function UpdateAnnouncement() {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState<
        AnnouncementData | undefined
    >(undefined);

    useEffect(() => {
        if (!id) return;
        api.get(`/api/announcements/${id}`)
            .then((res) => setAnnouncement(res.data))
            .catch((err) => console.log(err));
    }, [id]);

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
                    <h1 className="text-secondary-alt">
                        Update your announcement
                    </h1>
                    <p className="text-secondary-alt">
                        Let your community know <br /> what you've been up to
                    </p>
                </div>
                <AnnouncementForm
                    route={`/api/announcements/${announcement?.id}/`}
                    initialData={announcement}
                />
            </div>
        </div>
    );
}

export default UpdateAnnouncement;
