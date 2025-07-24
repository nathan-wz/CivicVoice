import DashboardPinnedIssue from "../components/DashboardPinnedIssue";
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
                <DashboardPinnedIssue
                    title="Issue Title"
                    description="Issue description"
                />
                <DashboardPinnedIssue
                    title="Issue Title"
                    description="Issue description"
                />
                <DashboardPinnedIssue
                    title="Issue Title"
                    description="Issue description"
                />
            </div>
        </div>
    );
}

export default PinnedIssues;
