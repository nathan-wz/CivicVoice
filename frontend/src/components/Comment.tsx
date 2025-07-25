import { type CommentData } from "../types";
import { formatDate } from "../utils/formatDate";

interface CommentProps {
    comment: CommentData;
}

function Comment({ comment }: CommentProps) {
    return (
        <div className="p-5 mb-5 mx-3 bg-secondary-alt rounded-lg">
            <h4>
                {comment.user} &#8226; {formatDate(comment.created_at)}
            </h4>
            <p>{comment.content}</p>
        </div>
    );
}

export default Comment;
