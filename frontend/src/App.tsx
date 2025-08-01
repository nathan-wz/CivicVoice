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
import Register from "./pages/Register.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import UpdateIssue from "./pages/UpdateIssue.tsx";
import UpdateAnnouncement from "./pages/UpdateAnnouncement.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/profile/:id" element={<div>Profile</div>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="issues" element={<Issues />} />
                    <Route path="/issue/:id" element={<IssuePost />} />
                    <Route
                        path="/post-an-issue"
                        element={
                            <ProtectedRoute>
                                <PostAnIssue />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/issue/:id/edit"
                        element={
                            <ProtectedRoute>
                                <UpdateIssue />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/pinned-issues" element={<PinnedIssues />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route
                        path="/make-an-announcement"
                        element={
                            <ProtectedRoute>
                                <MakeAnAnnouncement />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/announcement/:id/edit"
                        element={
                            <ProtectedRoute>
                                <UpdateAnnouncement />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/announcement/:id"
                        element={<AnnouncementPost />}
                    />
                    <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
