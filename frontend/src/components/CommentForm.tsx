import { useState } from "react";
import api from "../api";

interface CommentFormProps {
    model?: string;
    objectId?: number;
    onSuccess?: () => void;
}

function CommentForm({ model, objectId, onSuccess }: CommentFormProps) {
    const [content, setContent] = useState("");

    const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await api.post("/api/comments/", {
                content,
                object_id: objectId,
                model,
            });

            setContent("");
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("Failed to post comment", err);
            alert("Could not post comment");
        }
    };

    return (
        <form onSubmit={postComment}>
            <input
                type="text"
                placeholder="Enter a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button
                type="submit"
                className="p-3 font-bold bg-primary text-secondary-alt rounded-md"
            >
                Send
            </button>
        </form>
    );
}

export default CommentForm;
