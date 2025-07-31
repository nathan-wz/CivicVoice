import { useState } from "react";
import type { CommentData } from "../types";
import api from "../api";

interface CommentFormProps {
    model?: string;
    objectId?: number;
    parentId?: number;
    onSuccess?: (comment: CommentData) => void;
}

function CommentForm({
    model,
    objectId,
    parentId,
    onSuccess,
}: CommentFormProps) {
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/comments/", {
                content,
                model,
                object_id: objectId,
                parent_comment: parentId || null,
            });
            setContent("");
            if (onSuccess) onSuccess(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border rounded"
                rows={3}
            />
            <button
                type="submit"
                className="mt-2 p-2 bg-primary text-white rounded"
            >
                Post
            </button>
        </form>
    );
}

export default CommentForm;
