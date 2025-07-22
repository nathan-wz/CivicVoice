import Issue from "../components/Issue";
import SideMenu from "../components/SideMenu";

function PinnedIssues() {
    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <div className="section-heading">
                    <h1>Pinned Issues</h1>
                    <p>Follow up on what's important to you</p>
                </div>
                <Issue
                    title="Issue Title"
                    description="Issue description"
                    created="created 3 days ago"
                />
                <Issue
                    title="Issue Title"
                    description="Issue description"
                    created="created 3 days ago"
                />
                <Issue
                    title="Issue Title"
                    description="Issue description"
                    created="created 3 days ago"
                />
            </div>
        </div>
    );
}

export default PinnedIssues;
