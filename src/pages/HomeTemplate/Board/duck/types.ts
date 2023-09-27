export interface BoardState<T> {
  loading: boolean;
  data: T[] | null | T;
  dataTaskDetail: T[] | null | T;
  dataDeleteTask: T[] | null | T;
  dataUpdateStatus: T[] | null | T;
  dataUpdateTask: T[] | null | T;
  error: any;
  infoTaskDetail: T[] | null | T | undefined;
  userTask: T[] | null | T | undefined;
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

export interface GetTaskDetail {
  priorityTask: {
    priorityId: number,
    priority: string
  },
  taskTypeDetail: {
    id: number,
    taskType: string
  },
  assigness: [
    {
      id: number,
      avatar: string,
      name: string,
      alias: string
    }
  ],
  lstComment: [],
  taskId: number,
  taskName: string,
  alias: string,
  description: string,
  statusId: string,
  originalEstimate: number,
  timeTrackingSpent: number,
  timeTrackingRemaining: number,
  typeId: number,
  priorityId: number,
  projectId: number
}

export interface UpdateTask {
  listUserAsign: [],
  taskId: string,
  taskName: string,
  description: string,
  statusId: string,
  originalEstimate: number,
  timeTrackingSpent: number,
  timeTrackingRemaining: number,
  projectId: number,
  typeId: number,
  priorityId: number
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

