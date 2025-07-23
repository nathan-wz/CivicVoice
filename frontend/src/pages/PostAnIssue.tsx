import IssueForm from "../components/IssueForm";
import SideMenu from "../components/SideMenu";

function PostAnIssue() {
    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <div className="section-heading">
                    <h1>Post an issue</h1>
                    <p>Make your voice heard</p>
                </div>
                <IssueForm route="/api/issues/" />
            </div>
        </div>
    );
}

export default PostAnIssue;
