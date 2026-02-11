export type TaskType = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type Filters = 'all' | 'active' | 'completed';

export type ToDoContextType = {
  // состояние
  error: string | null;
  tasks: TaskType[];
  filter: Filters;

  // сеттеры состояния
  setTasks: (tasks: TaskType[]) => void;
  setFilter: (filter: Filters) => void;

  // вычисляемые значения
  filteredTasks: TaskType[];

  // обработчики
  handleAddTask: (text: string) => void;
  handleComplete: (id: string | number) => void;
  handleDelete: (id: string | number) => void;
  handleDeleteCompleted: () => void;
  handleEdit: (id: string | number, newText: string) => void;
};

export type ErrorType = {
  success: boolean;
  errors: ErrorItem[];
};

type ErrorItem = {
  value?: object;
  msg: string;
  param: string;
  location: string;
};
