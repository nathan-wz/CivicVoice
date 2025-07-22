interface PinnedIssueProps {
    title: string;
    description: string;
}

function PinnedIssue({ title, description }: PinnedIssueProps) {
    return (
        <div className="inline-block h-40 w-50 p-5 m-3 bg-secondary-alt rounded-lg">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default PinnedIssue;
