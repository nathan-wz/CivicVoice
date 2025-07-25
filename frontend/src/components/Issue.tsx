import { type IssueData } from "../types";
import { formatDate } from "../utils/formatDate";

interface IssueProps {
    issue: IssueData;
}

function Issue({ issue }: IssueProps) {
    return (
        <div className="p-5 mb-5 mx-3 bg-secondary-alt rounded-lg">
            <div className="flex justify-between">
                <h3>{issue.title}</h3>
                <h3>{formatDate(issue.updated_at)}</h3>
            </div>
            <p>{issue.description}</p>
        </div>
    );
}

export default Issue;
