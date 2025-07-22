import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.tsx";
import IssuePost from "./pages/IssuePost.tsx";
import PostAnIssue from "./pages/PostAnIssue";
import PinnedIssues from "./pages/PinnedIssues";
import Issues from "./pages/Issues.tsx";
import Announcements from "./pages/Announcements.tsx";
import MakeAnAnnouncement from "./pages/MakeAnAnnouncement.tsx";
import AnnouncementPost from "./pages/AnnouncementPost.tsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="issues" element={<Issues />} />
                <Route path="/issue-post" element={<IssuePost />} />
                <Route path="/post-an-issue" element={<PostAnIssue />} />
                <Route path="/pinned-issues" element={<PinnedIssues />} />
                <Route path="/annoucements" element={<Announcements />} />
                <Route
                    path="/make-an-announcement"
                    element={<MakeAnAnnouncement />}
                />
                <Route
                    path="/announcement-post"
                    element={<AnnouncementPost />}
                />
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
