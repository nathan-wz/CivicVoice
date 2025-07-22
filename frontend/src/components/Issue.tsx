interface IssueProps {
    title: string;
    description: string;
    created: string;
}

function Issue({ title, description, created }: IssueProps) {
    return (
        <div className="p-5 mb-5 mx-3 bg-secondary-alt rounded-lg">
            <div className="flex justify-between">
                <h3>{title}</h3>
                <h3>{created}</h3>
            </div>
            <p>{description}</p>
        </div>
    );
}

export default Issue;
