import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import type { UserData } from "../types";

interface UserFormProps {
    route: string;
    method: "login" | "update" | "register";
    initialData?: any;
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

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [counties, setCounties] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
    const [selectedCity, setSelectedCity] = useState<number | null>(null);
    const [selectedCounty, setSelectedCounty] = useState<number | null>(null);

    const navigate = useNavigate();
    const { login } = useAuth();

    // Pre-fill form if updating

    useEffect(() => {
        api.get("/api/locations/countries/")
            .then((res) => setCountries(res.data))
            .catch((err) => console.error("Failed to load countries", err));
    }, []);

    useEffect(() => {
        if (selectedCountry !== null) {
            api.get(`api/locations/cities/?country=${selectedCountry}`)
                .then((res) => setCities(res.data))
                .catch((err) => console.error("Failed to load cities", err));
            setSelectedCity(null);
            setCounties([]);
            setSelectedCounty(null);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCity !== null) {
            api.get(`/api/locations/counties/?city=${selectedCity}`)
                .then((res) => setCounties(res.data))
                .catch((err) => console.error("Failed to load counties", err));
            setSelectedCounty(null);
        }
    }, [selectedCity]);

    useEffect(() => {
        if (isUpdate && initialData) {
            setUsername(initialData.username);
            setEmail(initialData.email);

            const countryId = initialData.country?.id;
            const cityId = initialData.city?.id;
            const countyId = initialData.county?.id;

            if (countryId) {
                setSelectedCountry(countryId);

                // Load cities for the selected country
                api.get(`/api/locations/cities/?country=${countryId}`).then(
                    (res) => {
                        setCities(res.data);
                        if (cityId) {
                            setSelectedCity(cityId);

                            // Load counties for the selected city
                            api.get(
                                `/api/locations/counties/?city=${cityId}`
                            ).then((res) => {
                                setCounties(res.data);
                                if (countyId) {
                                    setSelectedCounty(countyId);
                                }
                            });
                        }
                    }
                );
            }
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
                await api.post(route, {
                    username,
                    email,
                    password,
                    country_id: selectedCountry ?? undefined,
                    city_id: selectedCity ?? undefined,
                    county_id: selectedCounty ?? undefined,
                });
                navigate("/login");
            } else if (isUpdate) {
                const payload: Partial<UserData & { password?: string }> = {
                    username,
                    email,
                    country_id: selectedCountry ?? undefined,
                    city_id: selectedCity ?? undefined,
                    county_id: selectedCounty ?? undefined,
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

            {(isRegister || isUpdate) && (
                <>
                    <label htmlFor="country">Country</label>
                    <select
                        value={selectedCountry || ""}
                        onChange={(e) =>
                            setSelectedCountry(Number(e.target.value) || null)
                        }
                        required
                    >
                        <option value="">-- Select Country --</option>
                        {countries.map((c: any) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="city">City</label>
                    <select
                        value={selectedCity || ""}
                        onChange={(e) =>
                            setSelectedCity(Number(e.target.value) || null)
                        }
                        required
                        disabled={!selectedCountry}
                    >
                        <option value="">-- Select City --</option>
                        {cities.map((c: any) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="county">County</label>
                    <select
                        value={selectedCounty || ""}
                        onChange={(e) =>
                            setSelectedCounty(Number(e.target.value) || null)
                        }
                        required
                        disabled={!selectedCity}
                    >
                        <option value="">-- Select County --</option>
                        {counties.map((c: any) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
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
