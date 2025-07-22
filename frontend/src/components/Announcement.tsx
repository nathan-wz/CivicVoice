interface AnnouncementProps {
    title: string;
    description: string;
    created: string;
}

function Announcement({ title, description, created }: AnnouncementProps) {
    return (
        <div className="p-5 mb-5 mx-3 bg-secondary-alt rounded-lg">
            <div className="flex justify-between">
                <h3>{title}</h3>
                <h3>{created}</h3>
            </div>
            <p>{description}</p>
        </div>
    );
}

export default Announcement;
