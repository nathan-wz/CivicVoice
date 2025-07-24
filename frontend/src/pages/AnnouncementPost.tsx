import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
import { type CommentData, type AnnouncementData } from "../types";

import SideMenu from "../components/SideMenu";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";

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
                <h3 className="mt-5">username</h3>
                <div>
                    <h2>Title</h2>
                    <p className="mb-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsum iusto iure ratione est quasi ex! Odit enim a ad
                        fugiat quas, repellendus nulla corrupti ipsam.
                    </p>
                    <h3>Category: "category name"</h3>
                    <h3>Status: Pending</h3>
                </div>

                <h2 className="mt-10">{comments?.length || 0} Comments</h2>
                <CommentForm model="announcement" objectId={announcement.id} />
                {comments?.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}

export default AnnouncementPost;
