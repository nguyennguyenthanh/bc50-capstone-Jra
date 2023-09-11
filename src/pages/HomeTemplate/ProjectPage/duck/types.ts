export interface ProjectState<T> {
    loading: boolean;
    data: T[] | null | T;
    error: any
}

export interface Action {
    type: string;
    payload?: any;
}
export interface AllProjects {
    members: [];
    creator: {
        id: number,
        name: string,
    }
    id: number;
    projectName: string;
    description: string;
    categoryId: number;
    categoryName: string;
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

