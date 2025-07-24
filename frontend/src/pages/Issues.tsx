import { useEffect, useState } from "react";
import api from "../api";
import Issue from "../components/Issue";
import SideMenu from "../components/SideMenu";
import { Link } from "react-router-dom";

function Issues() {
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
                <div className="section-heading">
                    <h1>Issues</h1>
                    <p>
                        See what needs to be solved <br /> in your community
                    </p>
                </div>
                {issues.map((issue) => (
                    <Link to={`/issue/${issue.id}`}>
                        <Issue issue={issue} key={issue.id} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Issues;
