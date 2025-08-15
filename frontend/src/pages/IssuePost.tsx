import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
import SideMenu from "../components/SideMenu";
import { type CommentData, type IssueData } from "../types";
import { formatDate } from "../utils/formatDate";
import CommentSection from "../components/CommentSection";

function IssuePost() {
    const { id } = useParams();
    const [issue, setIssue] = useState<IssueData | null>(null);
    const [comments, setComments] = useState<CommentData[] | null>(null);

    useEffect(() => {
        if (!id) return;

        // fetch issue data
        api.get(`/api/issues/${id}`)
            .then((res) => setIssue(res.data))
            .catch((err) => console.error(err));

        // fetch comments for this issue
        api.get(`/api/comments/for_object/?model=issue&id=${id}`)
            .then((res) => {
                setComments(res.data);
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    }, [id]);

    if (!issue) return <p>Loading...</p>;

    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <h4 className="mt-10">
                    {issue.user?.username} &#8226;{" "}
                    {formatDate(issue.created_at)}
                </h4>
                <hr />
                <br />
                <div>
                    <h3>{issue.title}</h3>
                    <p className="mb-5">{issue.description}</p>
                    <hr />
                    <br />
                    <h4>Category: {issue.category}</h4>
                    <h4>status: {issue.status}</h4>

                    <br />
                    <div>
                        <Link
                            to={`/issue/${issue.id}/edit`}
                            className="p-3 bg-primary text-secondary-alt rounded-md"
                        >
                            Update
                        </Link>
                    </div>
                    <br />
                    <hr />
                    <br />
                </div>

                <h2 className="mt-10">{comments?.length || 0} Comments</h2>
                <CommentSection model="issue" objectId={issue.id} />
            </div>
        </div>
    );
}

export default IssuePost;
