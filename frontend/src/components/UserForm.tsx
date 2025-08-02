import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import type { UserData } from "../types";

interface UserFormProps {
    route: string;
    method: "login" | "update" | "register";
    initialData?: UserData;
}

function UserForm({ route, method, initialData }: UserFormProps) {
    const isLogin = method === "login";
    const isRegister = method === "register";
    const isUpdate = method === "update";

    const [username, setUsername] = useState<string | undefined>("");
    const [email, setEmail] = useState<string | undefined>("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    // Pre-fill form if updating
    useEffect(() => {
        if (isUpdate && initialData) {
            setUsername(initialData.username);
            setEmail(initialData.email);
        }
    }, [isUpdate, initialData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if ((isRegister || isUpdate) && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            if (isLogin) {
                const res = await api.post(route, { username, password });
                const { access, refresh } = res.data;
                login(access, refresh);
                navigate("/");
            } else if (isRegister) {
                await api.post(route, { username, email, password });
                navigate("/login");
            } else if (isUpdate) {
                const payload: Partial<UserData & { password?: string }> = {
                    username,
                    email,
                };
                if (password) {
                    payload.password = password;
                }
                await api.patch(route, payload);
                navigate(`/profile/${initialData?.id}`);
            }
        } catch (err: any) {
            console.error(err);
            setError(
                err.response?.data?.detail ||
                    err.message ||
                    "An error occurred."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <h2 className="text-xl font-semibold mb-2">
                {isLogin ? "Login" : isRegister ? "Register" : "Update Profile"}
            </h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <label htmlFor="username">Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            {(isRegister || isUpdate) && (
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

            <label htmlFor="password">
                {isUpdate ? "New Password (optional)" : "Password"}
            </label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={isLogin || isRegister}
            />

            {(isRegister || isUpdate) && (
                <>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={!!password}
                    />
                </>
            )}

            <input
                type="submit"
                value={
                    loading
                        ? "Please wait..."
                        : isLogin
                        ? "Login"
                        : isRegister
                        ? "Register"
                        : "Update Profile"
                }
                className="button"
                disabled={loading}
            />
        </form>
    );
}

export default UserForm;
