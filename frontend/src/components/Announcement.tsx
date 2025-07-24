import { type AnnouncementData } from "../types";

interface AnnouncementProps {
    announcement: AnnouncementData;
}

function Announcement({ announcement }: AnnouncementProps) {
    return (
        <div className="p-5 mb-5 mx-3 bg-secondary-alt rounded-lg">
            <div className="flex justify-between">
                <h3>{announcement.title}</h3>
                <h3>{announcement.created}</h3>
            </div>
            <p>{announcement.description}</p>
        </div>
    );
}

export default Announcement;
