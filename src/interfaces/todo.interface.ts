export interface ITodo {
    id?: number;
    user_id: number;
    title: string;
    description?: string;
    completed?: boolean;
    due_date?: Date;
    created_at?: Date;
    updated_at?: Date;
}

export interface ITodoInput {
    user_id: number;
    title: string;
    description?: string;
    completed?: boolean;
    due_date?: Date;
}