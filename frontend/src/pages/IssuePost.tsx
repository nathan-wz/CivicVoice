import Comment from "../components/Comment";
import SideMenu from "../components/SideMenu";

function IssuePost() {
    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-content">
                <h3 className="mt-5">username</h3>
                <div>
                    <h2>Title</h2>
                    <p className="mb-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsum iusto iure ratione est quasi ex! Odit enim a ad
                        fugiat quas, repellendus nulla corrupti ipsam.
                    </p>
                    <h3>Category: "category name"</h3>
                    <h3>Status: Pending</h3>
                </div>

                <h2 className="mt-10">10 Comments</h2>
                <Comment
                    username="test"
                    description="comment-description"
                    created="3"
                />
                <Comment
                    username="test"
                    description="comment-description"
                    created="3"
                />
                <Comment
                    username="test"
                    description="comment-description"
                    created="3"
                />
            </div>
        </div>
    );
}

export default IssuePost;
