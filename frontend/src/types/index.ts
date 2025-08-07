export interface County {
    id: number;
    name: string;
}
export interface City {
    id: number;
    name: string;
    country: number;
}

export interface County {
    id: number;
    name: string;
    city: number;
}

export interface UserData {
    id?: number;
    username?: string;
    email?: string;
    country: number | null;
    city: number | null;
    county: number | null;

    country_id?: number;
    county_id?: number;
    city_id?: number;
}

export interface CommentData {
    id?: number;
    user?: string;
    content?: string;
    created_at?: string;
    updated_at?: string;
    replies?: CommentData[];
    parent_comment?: number | null;
}

export interface IssueData {
    id?: number;
    title?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    category?: string;
    votes?: number;
    status?: string;
    user?: UserData;
}

export interface AnnouncementData {
    id?: number;
    title?: string;
    description?: string;
    issue_reference?: string;
    user?: UserData;
    created_at?: string;
    updated_at?: string;
}
