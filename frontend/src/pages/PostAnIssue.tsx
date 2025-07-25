import IssueForm from "../components/IssueForm";
import SideMenu from "../components/SideMenu";
import issueHeading3 from "../assets/images/issue_heading_3.jpg";

function PostAnIssue() {
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
                    <h1 className="text-secondary-alt">Post an issue</h1>
                    <p className="text-secondary-alt">Make your voice heard</p>
                </div>
                <IssueForm route="/api/issues/" />
            </div>
        </div>
    );
}

export default PostAnIssue;
