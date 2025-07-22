import { useState } from "react";
import ComboBox from "./ComboBox";

function IssueForm() {
    const [categories, setCategories] = useState([
        "Food",
        "Water",
        "Electricity",
    ]);

    return (
        <form className="home-form" action="">
            <label htmlFor="title">Title</label>
            <input type="text" />
            <label htmlFor="description">Description</label>
            <textarea rows={5} name="description" id="description"></textarea>
            <label htmlFor="category">Category</label>
            <ComboBox className="w-[50%]" placeholder="Enter the category..." />

            <input type="submit" value="Submit" />
        </form>
    );
}

export default IssueForm;
