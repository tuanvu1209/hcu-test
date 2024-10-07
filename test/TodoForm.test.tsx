import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from '../src/component/TodoForm';
import React from 'react';

describe('TodoForm', () => {
  const mockOnChange = jest.fn();
  const mockOnHandleAdd = jest.fn();

  beforeEach(() => {
    render(
      <TodoForm
        value=""
        onChange={mockOnChange}
        onHandleAdd={mockOnHandleAdd}
      />
    );
  });

  test('renders TodoForm with TextField and Button', () => {
    expect(screen.getByLabelText(/what do you need to do/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  test('calls onChange when input value changes', () => {
    fireEvent.change(screen.getByLabelText(/what do you need to do/i), {
      target: { value: 'New Task' },
    });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('calls onHandleAdd when Enter key is pressed', () => {
    fireEvent.keyDown(screen.getByLabelText(/what do you need to do/i), {
      key: 'Enter',
      code: 'Enter',
    });
    expect(mockOnHandleAdd).toHaveBeenCalled();
  });

  test('calls onHandleAdd when button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(mockOnHandleAdd).toHaveBeenCalled();
  });
});
