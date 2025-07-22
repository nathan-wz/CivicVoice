function AnnouncementForm() {
    return (
        <form className="home-form" action="">
            <label htmlFor="title">Title</label>
            <input type="text" />
            <label htmlFor="Description">Description</label>
            <textarea rows={5} name="description" id="description"></textarea>
            <label htmlFor="issue-references">Issue Reference</label>
            <input type="text" />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default AnnouncementForm;
