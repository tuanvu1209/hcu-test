import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../src/component/TodoItem';
import { TaskProp } from '../src/types';
import React from 'react';

describe('TodoItem', () => {
  const mockOnUpdateTask = jest.fn();
  const mockOnDelete = jest.fn();
  const task: TaskProp = {
    id: 1,
    title: 'Sample Task',
    completed: false,
    type: 0,
  };

  beforeEach(() => {
    render(
      <TodoItem
        item={task}
        onUpdateTask={mockOnUpdateTask}
        onDelete={mockOnDelete}
      />
    );
  });

  test('renders the task title', () => {
    expect(screen.getByText(/sample task/i)).toBeInTheDocument();
  });

  test('calls onUpdateTask when checkbox is changed', () => {
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnUpdateTask).toHaveBeenCalledWith({ ...task, completed: true });
  });

  test('calls onDelete when delete button is clicked', () => {
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(task.id);
  });
});
