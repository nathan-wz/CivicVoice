import { type AnnouncementData } from "../types";
import { formatDate } from "../utils/formatDate";

interface AnnouncementProps {
    announcement: AnnouncementData;
}

function Announcement({ announcement }: AnnouncementProps) {
    return (
        <div className="whitespace-pre-line p-5 mb-5 mx-3 bg-secondary-alt rounded-lg">
            <div className="flex justify-between">
                <h3>{announcement.title}</h3>
                <h3>{formatDate(announcement.created_at)}</h3>
            </div>
            <p className="line-clamp-6">{announcement.description}</p>
        </div>
    );
}

export default Announcement;
