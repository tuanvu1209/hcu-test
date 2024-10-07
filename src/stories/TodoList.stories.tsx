import TodoList from '../component/TodoList';
import { TaskProp } from '../types';

export default {
  title: 'TodoList',
  component: TodoList,
};

const tasks: TaskProp[] = [
  { id: 1, title: 'Task 1', completed: false, type: 0 },
  { id: 2, title: 'Task 2', completed: true, type: 0 },
];

export const Default = () => (
  <TodoList
    list={tasks}
    loading={false}
    onUpdateTask={() => {}}
    onDelete={() => {}}
  />
);
