import { type CommentData } from "../types";

interface CommentProps {
    comment: CommentData;
}

function Comment({ comment }: CommentProps) {
    return (
        <div className="p-5 mb-5 mx-3 bg-secondary-alt rounded-lg">
            <h3 className="flex justify-between">
                <div>{comment.user}</div> <div>{comment.created_at}</div>
            </h3>
            <p>{comment.content}</p>
        </div>
    );
}

export default Comment;
