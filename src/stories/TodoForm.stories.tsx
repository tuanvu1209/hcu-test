import TodoForm from '../component/TodoForm';

export default {
  title: 'TodoForm',
  component: TodoForm,
};

export const Default = () => (
  <TodoForm
    value=""
    onChange={() => {}}
    onHandleAdd={() => {}}
  />
);
