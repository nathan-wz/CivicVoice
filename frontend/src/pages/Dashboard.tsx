import PinnedIssue from "../components/PinnedIssue";
import SideMenu from "../components/SideMenu";

function Dashboard() {
    return (
        <div className="flex">
            <SideMenu />
            <div className="section-heading">
                <h2>Pinned Issues</h2>
                <div className="overflow-x-scroll whitespace-nowrap">
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
                    <PinnedIssue
                        title="Issue"
                        description="Issue description"
                    />
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default Dashboard;
