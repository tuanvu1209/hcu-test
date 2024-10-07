import { render, screen } from '@testing-library/react';
import TodoList from '../src/component/TodoList';
import { TaskProp } from '../src/types';
import React from 'react';

describe('TodoList', () => {
  const mockOnUpdateTask = jest.fn();
  const mockOnDelete = jest.fn();

  test('renders loading skeleton when loading is true', () => {
    render(
      <TodoList
        list={[]}
        loading={true}
        onUpdateTask={mockOnUpdateTask}
        onDelete={mockOnDelete}
      />
    );

    const skeletons = screen.getAllByRole('progressbar');
    expect(skeletons.length).toBe(4);
  });

  test('renders list of tasks when loading is false', () => {
    const tasks: TaskProp[] = [
      {
        id: 1,
        title: 'Task 1',
        completed: false,
        type: 0,
      },
      {
        id: 2,
        title: 'Task 2',
        completed: true,
        type: 0,
      },
    ];

    render(
      <TodoList
        list={tasks}
        loading={false}
        onUpdateTask={mockOnUpdateTask}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/task 2/i)).toBeInTheDocument();
  });
});
