import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import type { IssueData } from "../types";

interface IssueFormProps {
    route: string;
    initialData?: IssueData;
}

function IssueForm({ route, initialData }: IssueFormProps) {
    const defaults = {
        title: initialData?.title ?? "",
        description: initialData?.description ?? "",
        category: initialData?.category ?? "",
        status: initialData?.status ?? "OPEN",
    };

    const [title, setTitle] = useState<string>(defaults.title);
    const [description, setDescription] = useState<string>(
        defaults.description
    );
    const [category, setCategory] = useState<string>(defaults.category);
    const [status, setStatus] = useState<string>(defaults.status);
    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setTitle(defaults.title);
            setDescription(defaults.description);
            setCategory(defaults.category);
            setStatus(defaults.status);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = { title, description, category, status };

        try {
            if (initialData) {
                const res = await api.patch(route, payload);
                console.log("Updated Issue: ", res.data);
            } else {
                const res = await api.post(route, payload);
                console.log("Posted Issue: ", res.data);
            }
            navigate("/issues");
        } catch (error) {
            console.error("Error posting Issue", error);
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

            <label htmlFor="description">Description</label>
            <textarea
                rows={5}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
            ></textarea>

            <label htmlFor="status">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
                <option value="ARCHIVED">Archived</option>
            </select>

            <label htmlFor="category">Category</label>
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <input type="submit" value="Submit" />
        </form>
    );
}

export default IssueForm;
