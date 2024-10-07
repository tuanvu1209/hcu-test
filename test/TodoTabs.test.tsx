import { render, screen, fireEvent } from '@testing-library/react';
import TodoTabs from '../src/component/TodoTabs';
import React from 'react';

describe('TodoTabs', () => {
  const mockOnHandleChange = jest.fn();

  beforeEach(() => {
    render(
      <TodoTabs
        tab={0}
        onHandleChange={mockOnHandleChange}
      />
    );
  });

  test('renders tabs', () => {
    expect(screen.getByText(/personal/i)).toBeInTheDocument();
    expect(screen.getByText(/professional/i)).toBeInTheDocument();
  });

  test('calls onHandleChange when tab is changed', () => {
    fireEvent.click(screen.getByText(/professional/i));
    expect(mockOnHandleChange).toHaveBeenCalled();
  });
});
