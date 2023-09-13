export interface ProfileState<T> {
    loading: boolean;
    data: T[] | null | T;
    dataUpdate: T[] | null | T;
    error: any;
    profileUser: T[] | null | T | undefined;
}

export interface Action {
    type: string;
    payload?: any;
}

export interface ProfileUser {
    id: number,
    email: string,
    name: string,
    phoneNumber: number,
    passWord: string,
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

