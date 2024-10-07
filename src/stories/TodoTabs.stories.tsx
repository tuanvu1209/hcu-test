import TodoTabs from '../component/TodoTabs';

export default {
  title: 'TodoTabs',
  component: TodoTabs,
};

export const Default = () => (
  <TodoTabs
    tab={0}
    onHandleChange={() => {}}
  />
);
