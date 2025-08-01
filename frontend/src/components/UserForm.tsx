import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";

interface UserFormProps {
    route: string;
    method: "login" | "register";
}

function UserForm({ route, method }: UserFormProps) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth(); // ✅ get login from AuthContext
    const isLogin = method === "login";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            const payload = isLogin
                ? { username, password }
                : { username, email, password };

            const res = await api.post(route, payload);

            if (isLogin) {
                const { access, refresh } = res.data;
                login(access, refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <h2 className="text-xl font-semibold mb-2">
                {isLogin ? "Login" : "Register"}
            </h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <label htmlFor="username">Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            {!isLogin && (
                <>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </>
            )}

            <label htmlFor="password">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {!isLogin && (
                <>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </>
            )}

            <input
                type="submit"
                value={
                    loading ? "Please wait..." : isLogin ? "Login" : "Register"
                }
                className="button"
                disabled={loading}
            />
        </form>
    );
}

export default UserForm;
