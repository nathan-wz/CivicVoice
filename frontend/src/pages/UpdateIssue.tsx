import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type IssueData } from "../types";
import api from "../api";
import SideMenu from "../components/SideMenu";
import IssueForm from "../components/IssueForm";
import issueHeading3 from "../assets/images/issue_heading_3.jpg";

function UpdateIssue() {
    const { id } = useParams();
    const [issue, setIssue] = useState<IssueData | undefined>(undefined);

    useEffect(() => {
        if (!id) return;
        api.get(`/api/issues/${id}`)
            .then((res) => setIssue(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <div
                    className="section-heading"
                    style={{
                        backgroundImage: `linear-gradient(to right, black 0%, black 20%, transparent 100%), url('${issueHeading3}')`,
                    }}
                >
                    <h1 className="text-secondary-alt">Update your issue</h1>
                    <p className="text-secondary-alt">Make your voice heard</p>
                </div>
                <IssueForm
                    route={`/api/issues/${issue?.id}/`}
                    initialData={issue}
                />
            </div>
        </div>
    );
}

export default UpdateIssue;
