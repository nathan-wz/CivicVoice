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
