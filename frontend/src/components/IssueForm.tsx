import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

interface IssueFormProps {
    route: string;
}

function IssueForm({ route }: IssueFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const postIssue = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await api.post(route, { title, description, category });
            console.log("Posted Issue: ", res.data);
            navigate("/issues");
        } catch (error) {
            console.error("Error posting Issue", error);
        }
    };

    return (
        <form onSubmit={postIssue} className="home-form" action="">
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
