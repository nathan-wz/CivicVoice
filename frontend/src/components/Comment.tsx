interface CommentProps {
    username: string;
    description: string;
    created: string;
}

function Comment({ username, description, created }: CommentProps) {
    return (
        <div className="p-5 mb-5 mx-3 bg-secondary-alt rounded-lg">
            <h3>
                {username} {created} days ago
            </h3>
            <p>{description}</p>
        </div>
    );
}

export default Comment;
