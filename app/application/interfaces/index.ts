import { Response as ExpressResponse } from "express";

export interface APIReturn {
    status: boolean;
    values?: Record<string, number>;
    message?: string;
}

export interface Response extends ExpressResponse {
    json: (data: APIReturn) => this;
}

export type UserRole = 'admin' | 'gestor' | 'editor' | 'user';

export interface GlobalUser {
    userId: number;
    role: UserRole;
    isCompany: boolean;
    workspace: string;
    modules: string[];
    isSubAccount: boolean;
    expires?: Date
}