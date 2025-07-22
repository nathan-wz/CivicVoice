import Issue from "../components/Issue";
import PinnedIssue from "../components/DashboardPinnedIssue";
import SideMenu from "../components/SideMenu";

function Dashboard() {
    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <div className="section-heading">
                    <h2>Issue tracker</h2>
                </div>

                <div className="p-10 mx-3 mb-5 h-100 bg-slate-100 rounded-lg">
                    <h1>Graph</h1>
                </div>

                {/* Pinned issues */}

                <div className="section-heading">
                    <h2>Pinned Issues</h2>
                </div>

                <div className="mb-5 w-full overflow-x-scroll whitespace-nowrap">
                    <PinnedIssue
                        title="Issue"
                        description="Issue description"
                    />
                    <PinnedIssue
                        title="Issue"
                        description="Issue description"
                    />
                    <PinnedIssue
                        title="Issue"
                        description="Issue description"
                    />
                    <PinnedIssue
                        title="Issue"
                        description="Issue description"
                    />
                </div>

                {/* Other Community Issues */}

                <div className="section-heading">
                    <h2>Other Community Issues</h2>
                </div>

                <div>
                    <Issue
                        title="Issue tile"
                        description="Issue description"
                        created="created 7 days ago"
                    />
                    <Issue
                        title="Issue tile"
                        description="Issue description"
                        created="created 7 days ago"
                    />
                    <Issue
                        title="Issue tile"
                        description="Issue description"
                        created="created 7 days ago"
                    />
                    <Issue
                        title="Issue tile"
                        description="Issue description"
                        created="created 7 days ago"
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
