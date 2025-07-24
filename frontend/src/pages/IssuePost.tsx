import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
import Comment from "../components/Comment";
import SideMenu from "../components/SideMenu";
import { type CommentData, type IssueData } from "../types";
import CommentForm from "../components/CommentForm";

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
                <h3 className="mt-5">{issue.user?.username}</h3>
                <div>
                    <h2>{issue.title}</h2>
                    <p className="mb-5">{issue.description}</p>
                    <h3>Category: {issue.category}</h3>
                    <h3>Status: Pending</h3>
                </div>

                <h2 className="mt-10">{comments?.length || 0} Comments</h2>
                <CommentForm model="issue" objectId={issue.id} />
                {comments?.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}

export default IssuePost;
