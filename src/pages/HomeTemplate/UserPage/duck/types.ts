export interface UserState<T> {
    loading: boolean;
    data: T[] | null | T;
    dataDelete: T[] | null | T;
    dataUpdate: T[] | null | T;
    error: any
    infoUser: T[] | null | T | undefined;
}

export interface Action {
    type: string;
    payload?: any;
}
export interface AllUsers {
    userId: number,
    name: string,
    avatar: string,
    email: string,
    phoneNumber: string
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

