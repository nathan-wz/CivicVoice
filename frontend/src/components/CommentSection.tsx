import { useEffect, useState } from "react";
import api from "../api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { type CommentData } from "../types";

interface CommentSectionProps {
    model: "issue" | "announcement"; // Or string if dynamic
    objectId?: number;
}

function CommentSection({ model, objectId }: CommentSectionProps) {
    const [comments, setComments] = useState<CommentData[]>([]);

    useEffect(() => {
        api.get(`/api/comments/for_object/?model=${model}&id=${objectId}`)
            .then((res) => setComments(res.data))
            .catch((err) => console.error(err));
    }, [model, objectId]);

    return (
        <div className="mt-10">
            <h2>{comments.length} Comments</h2>
            <CommentForm
                model={model}
                objectId={objectId}
                onSuccess={(newComment) => {
                    // Optional: add new top-level comment without refetch
                    setComments((prev) => [newComment, ...prev]);
                }}
            />
            <div className="space-y-4 mt-6">
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        objectId={objectId!}
                        model={model}
                        onReplyAdded={(newReply, parentId) => {
                            // Update the comments list by adding the new reply to the correct parent
                            setComments((prevComments) =>
                                prevComments.map((c) =>
                                    c.id === parentId
                                        ? {
                                              ...c,
                                              replies: [
                                                  ...(c.replies || []),
                                                  newReply,
                                              ],
                                          }
                                        : c
                                )
                            );
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default CommentSection;
