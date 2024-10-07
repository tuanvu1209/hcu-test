import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, IconButton } from '@mui/material';
import { TaskProp } from '../types';
import React from 'react';

function TodoItem({
  item,
  onUpdateTask,
  onDelete,
}: {
  item: TaskProp;
  onUpdateTask: (updatedTask: TaskProp) => void;
  onDelete: (id: number) => void;
}) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTask = { ...item, completed: e.target.checked };
    onUpdateTask(updatedTask);
  };

  return (
    <div className='flex items-center border-b-2 py-[20px] gap-5'>
      <Checkbox
        onChange={handleCheckboxChange}
        checked={item.completed}
      />
      <span
        className={`text-[20px] flex-1 ${
          item.completed ? 'line-through text-gray-700' : ''
        }`}
      >
        {item.title}
      </span>
      <IconButton onClick={() => onDelete(item.id)}>
        <DeleteIcon
          sx={{
            color: '#B30B04',
          }}
        />
      </IconButton>
    </div>
  );
}

export default TodoItem;
