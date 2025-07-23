import UserForm from "../components/UserForm";
import icon from "../assets/icons/user-solid.svg";

function Register() {
    return (
        <div className="flex items-center">
            <div className="flex-col-center">
                <img className="user-form-icon" src={icon} alt="" />
                <h2>
                    Create your <br /> CivicVoice account
                </h2>
            </div>
            <UserForm route="/api/user/register/" method="register" />
        </div>
    );
}

export default Register;
