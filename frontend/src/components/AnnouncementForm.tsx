import { useState } from "react";
import api from "../api";
import { Navigate, useNavigate } from "react-router-dom";

interface AnnouncementFormProps {
    route: string;
}

function AnnouncementForm({ route }: AnnouncementFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [issueReference, setIssueReference] = useState("");
    const navigate = useNavigate();

    const postAnnouncement = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await api.post(route, {
                title,
                description,
                issue_reference: issueReference,
            });
            console.log("Posted Announcement: ", res.data);
            navigate("/announcements");
        } catch (error) {
            console.error("Error posting announcement", error);
        }
    };

    return (
        <form onSubmit={postAnnouncement} className="home-form" action="">
            <label htmlFor="title">Title</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="Description">Description</label>
            <textarea
                rows={5}
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label htmlFor="issue-references">Issue Reference</label>
            <input
                type="text"
                value={issueReference}
                onChange={(e) => setIssueReference(e.target.value)}
            />

            <input type="submit" value="Submit" />
        </form>
    );
}

export default AnnouncementForm;
