import TodoItem from '../component/TodoItem';
import { TaskProp } from '../types';

export default {
  title: 'TodoItem',
  component: TodoItem,
};

const task: TaskProp = {
  id: 1,
  title: 'Sample Task',
  completed: false,
  type: 0,
};

export const Default = () => (
  <TodoItem
    item={task}
    onUpdateTask={() => {}}
    onDelete={() => {}}
  />
);
