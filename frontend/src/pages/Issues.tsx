import Issue from "../components/Issue";
import SideMenu from "../components/SideMenu";

function Issues() {
    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <div className="section-heading">
                    <h1>Issues</h1>
                    <p>
                        See what needs to be solved <br /> in your community
                    </p>
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

export default Issues;
