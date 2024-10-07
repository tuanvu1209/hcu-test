import TodoFilter from "../component/TodoFilter";

export default {
  title: 'TodoFilter',
  component: TodoFilter,
};

export const Default = () => (
  <TodoFilter
    value="all"
    onChange={() => {}}
  />
);
