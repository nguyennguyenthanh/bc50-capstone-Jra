export interface BoardState<T> {
  loading: boolean;
  data: T[] | null | T;
  error: any
}

export interface Action {
  type: string;
  payload?: any;
}
export interface Board {
  lstTask: [
    {
      lstTaskDeTail: [],
      statusId: string,
      statusName: string,
      alias: string
    }
  ];
  members: [
    {
      userId: number,
      name: string,
      avatar: string,
      email: null | string,
      phoneNumber: null | string | number,
    }
  ];
  creator: {
    id: number,
    name: string,
  }
  id: number;
  projectName: string;
  description: string;
  projectCategory: {
    id: number,
    name: string
  };
  alias: string;
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

