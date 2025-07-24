export interface UserData {
    id?: number;
    username?: string;
    email?: string;
}

export interface CommentData {
    id?: number;
    user?: string;
    content?: string;
    created_at?: string;
}

export interface IssueData {
    id?: number;
    title?: string;
    description?: string;
    created_at?: string;
    category?: string;
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
}
