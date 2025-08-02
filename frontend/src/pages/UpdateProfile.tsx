import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import UserForm from "../components/UserForm";
import api from "../api";
import { type UserData } from "../types";

function UpdateProfile() {
    const { id } = useParams();
    const [user, setUser] = useState<UserData>();

    useEffect(() => {
        if (!id) return;
        api.get(`/api/users/${id}/`)
            .then((res) => setUser(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    return (
        <div className="home-container">
            <SideMenu />
            <UserForm
                method="update"
                route={`/api/users/${id}/`}
                initialData={user}
            />
        </div>
    );
}

export default UpdateProfile;
