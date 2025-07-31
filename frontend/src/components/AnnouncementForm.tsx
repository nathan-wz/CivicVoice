import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import type { AnnouncementData } from "../types";

interface AnnouncementFormProps {
    route: string;
    initialData?: AnnouncementData;
}

function AnnouncementForm({ route, initialData }: AnnouncementFormProps) {
    const defaults = {
        title: initialData?.title ?? "",
        description: initialData?.description ?? "",
        issueReference: initialData?.issue_reference ?? "",
    };

    const [title, setTitle] = useState<string>(defaults.title);
    const [description, setDescription] = useState<string>(
        defaults.description
    );
    const [issueReference, setIssueReference] = useState<string>(
        defaults.issueReference
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setTitle(defaults.title);
            setDescription(defaults.description);
            setIssueReference(defaults.issueReference);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = { title, description, issue_reference: issueReference };

        try {
            if (initialData) {
                const res = await api.patch(route, payload);
                console.log("Updated Announcement: ", res.data);
            } else {
                const res = await api.post(route, payload);
                console.log("Posted Announcement: ", res.data);
            }
            navigate("/announcements");
        } catch (error) {
            console.error("Error posting announcement", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="home-form" action="">
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
