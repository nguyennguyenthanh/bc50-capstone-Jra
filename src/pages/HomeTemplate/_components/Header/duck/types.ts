export interface HeaderState<T> {
  loading: boolean;
  data: T[] | null | T;
  dataCreateTask: T[] | null | T;
  error: any;
  Priority: T[] | null | T | undefined;
  Status: T[] | null | T | undefined;
  infoTask: T[] | null | T | undefined;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface AllTask {
  listUserAsign: [
    number
  ],
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


export interface TaskType {
  id: number,
  taskType: string
}
export interface Priority {
  priorityId: number,
  priority: string,
  description: string,
  deleted: boolean,
  alias: string
}

export interface Status {
  statusId: string,
  statusName: string,
  alias: string,
  deleted: string
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

