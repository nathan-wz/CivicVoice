import { useState } from "react";
import { type CommentData } from "../types";
import { formatDate } from "../utils/formatDate";
import CommentForm from "./CommentForm"; // This is the form component you use for posting comments

interface CommentProps {
    comment: CommentData;
    level?: number;
    objectId: number;
    model: string;
    onReplyAdded?: (reply: CommentData, parentId?: number) => void;
}

function Comment({
    comment,
    level = 0,
    objectId,
    model,
    onReplyAdded,
}: CommentProps) {
    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleReplySubmit = (newReply: CommentData) => {
        setShowReplyForm(false);
        onReplyAdded?.(newReply, comment.id);
    };

    return (
        <div
            className="whitespace-pre-line p-4 mb-4 bg-secondary-alt rounded-lg"
            style={{ marginLeft: `${level * 1.5}rem` }}
        >
            <h4 className="text-sm font-semibold mb-1">
                {comment.user} &#8226; {formatDate(comment.created_at)}
            </h4>
            <p className="text-sm mb-2">{comment.content}</p>

            <button
                onClick={() => setShowReplyForm((prev) => !prev)}
                className="text-xs text-blue-500 hover:underline"
            >
                {showReplyForm ? "Cancel" : "Reply"}
            </button>

            {showReplyForm && (
                <div className="mt-2">
                    <CommentForm
                        parentId={comment.id}
                        onSuccess={handleReplySubmit}
                    />
                </div>
            )}

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-3 space-y-3">
                    {comment.replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            level={level + 1}
                            objectId={objectId}
                            model={model}
                            onReplyAdded={onReplyAdded}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Comment;
