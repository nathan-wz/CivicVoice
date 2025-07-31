import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
import { type CommentData, type AnnouncementData } from "../types";

import SideMenu from "../components/SideMenu";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { formatDate } from "../utils/formatDate";
import CommentSection from "../components/CommentSection";

function AnnouncementPost() {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState<AnnouncementData | null>(
        null
    );
    const [comments, setComments] = useState<CommentData[] | null>(null);

    useEffect(() => {
        if (!id) return;

        // fetch issue data
        api.get(`/api/announcements/${id}`)
            .then((res) => setAnnouncement(res.data))
            .catch((err) => console.error(err));

        // fetch comments for this announcement
        api.get(`/api/comments/for_object/?model=announcement&id=${id}`)
            .then((res) => {
                setComments(res.data);
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    }, [id]);

    if (!announcement) return <p>Loading...</p>;

    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <h3 className="mt-5">
                    {announcement.user?.username} &#8226;{" "}
                    {formatDate(announcement.created_at)}
                </h3>
                <hr />
                <br />
                <div>
                    <h2>{announcement.title}</h2>
                    <p className="mb-5">{announcement.description}</p>
                    <hr />
                    <br />
                    {announcement.issue_reference == "" ? (
                        <></>
                    ) : (
                        <div>
                            <h3>
                                Issue Reference: {announcement.issue_reference}
                            </h3>
                            <hr />
                            <br />
                            <Link
                                to={`/announcement/${announcement.id}/edit`}
                                className="p-3 bg-primary text-secondary-alt rounded-md"
                            >
                                Update
                            </Link>
                        </div>
                    )}
                </div>

                <h2 className="mt-10">{comments?.length || 0} Comments</h2>
                <CommentSection
                    model="announcement"
                    objectId={announcement.id}
                />
            </div>
        </div>
    );
}

export default AnnouncementPost;
