import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    user_id: number;
    exp: number;
    iat?: number;
}

export function getUserIdFromToken(token: string): number | null {
    try {
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.user_id;
    } catch (e) {
        console.error("Invalid token: ", e);
        return null;
    }
}
