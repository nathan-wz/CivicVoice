import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { type UserData } from "../types";
import api from "../api";
import userIcon from "../assets/icons/circle-user-solid-full.svg";
import SideMenu from "../components/SideMenu";

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState<UserData>();

    useEffect(() => {
        if (!id) return;

        api.get(`/api/users/${id}`)
            .then((res) => setUser(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    return (
        <div className="home-container">
            <SideMenu />
            <div className="home-form md:w-xl">
                <div className="flex flex-col items-center">
                    <img className="h-50" src={userIcon} alt="" />
                    <h1>{user?.username}</h1>
                </div>

                <h3>Email: {user?.email}</h3>

                <Link to={`/profile/${id}/edit`} className="self-end button">
                    Update Profile
                </Link>
            </div>
        </div>
    );
}

export default Profile;
