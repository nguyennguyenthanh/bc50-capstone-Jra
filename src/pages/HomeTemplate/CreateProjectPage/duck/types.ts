export interface CreateState<T> {
    loading: boolean;
    data: T[] | null | T;
    error: any
}

export interface Action {
    type: string;
    payload?: any;
}

export interface ProjectCategory {
    id: number,
    projectCategoryName: string;
}

export interface CreateProject {
    projectName: string,
    description: string;
    categoryId: number;
}

export interface Response<T> {
    statusCode: number;
    message: string;
    content: T[];
}

export interface Result<T> {
    data: Response<T>;
    status: number;
    statusText: string;
}

