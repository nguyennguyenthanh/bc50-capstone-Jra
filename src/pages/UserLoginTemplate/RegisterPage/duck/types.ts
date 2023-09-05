export interface RegisterState<T> {
    loading: boolean;
    data: T[] | null | T;
    error: any;
}


export interface Action {
    type: string;
    payload?: any;
}


export interface UserRegister {
    email: string,
    passWord: string;
    name: string;
    phoneNumber: number;
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