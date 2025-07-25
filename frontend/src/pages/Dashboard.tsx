import { useState, useEffect } from "react";
import api from "../api";
import Issue from "../components/Issue";
import SideMenu from "../components/SideMenu";
import StatusChart from "../components/StatusChart";
import { Link } from "react-router-dom";
import issueTrackerHeading from "../assets/images/landingSection3.jpg";
import issueHeading2 from "../assets/images/issue_heading_2.jpg";

function Dashboard() {
    const [issues, setIssues] = useState([{ id: 0 }]);

    useEffect(() => {
        getIssues();
    }, []);

    const getIssues = () => {
        api.get("/api/issues/")
            .then((res) => res.data)
            .then((data) => {
                setIssues(data);
                console.log(data);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <div
                    className="section-heading"
                    style={{
                        backgroundImage: `linear-gradient(to right, black 0%, black 20%, transparent 100%), url('${issueTrackerHeading}')`,
                    }}
                >
                    <h2 className="text-secondary-alt">Issue tracker</h2>
                </div>

                <div className="p-10 mx-3 mb-5 bg-slate-100 rounded-lg">
                    <StatusChart />
                </div>

                {/* Other Community Issues */}

                <div
                    className="section-heading"
                    style={{
                        backgroundImage: `linear-gradient(to right, black 0%, black 20%, transparent 100%), url('${issueHeading2}')`,
                    }}
                >
                    <h2 className="text-secondary-alt">Community Issues</h2>
                </div>

                <div>
                    {issues.map((issue) => (
                        <Link to={`/issue/${issue.id}`}>
                            <Issue issue={issue} key={issue.id} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
