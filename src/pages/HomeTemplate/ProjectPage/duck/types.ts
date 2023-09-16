export interface ProjectState<T> {
    loading: boolean;
    data: T[] | null | T;
    dataDelete: T[] | null | T;
    dataUpdate: T[] | null | T;    
    error: any
    infoProject: T[] | null | T | undefined;
    userProject: T[] | null | T | undefined;
}

export interface Action {
    type: string;
    payload?: any;
}
export interface AllProjects {
    members: [
        {
            userId: number,
            name: string,
            avatar: string
        }
    ];
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

