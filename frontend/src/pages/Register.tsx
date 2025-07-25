import UserForm from "../components/UserForm";
import icon from "../assets/icons/circle-user-solid-full.svg";

function Register() {
    return (
        <div className="user-form-layout">
            <div className="user-form-icon">
                <img className="user-form-icon-img" src={icon} alt="" />
                <h2 className="user-form-icon-text">
                    Create your <br /> CivicVoice account
                </h2>
            </div>
            <UserForm route="/api/user/register/" method="register" />
        </div>
    );
}

export default Register;
