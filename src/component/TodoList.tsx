import { Skeleton } from '@mui/material';
import { TaskProp } from '../types';
import TodoItem from './TodoItem';

function TodoList({
  list,
  loading,
  onUpdateTask,
  onDelete,
}: {
  list: TaskProp[];
  loading: boolean;
  onUpdateTask: (updatedTask: TaskProp) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className='h-[400px] overflow-auto'>
      {loading ? (
        Array.from({ length: 4 }).map(() => (
          <Skeleton
            variant='rectangular'
            width={'100%'}
            height={50}
            sx={{
              background: '#c1b2b2',
              margin: '20px 0',
              borderRadius: '50px',
            }}
          />
        ))
      ) : list.length > 0 ? (
        list &&
        list.map((task) => (
          <TodoItem
            key={task.id}
            item={task}
            onUpdateTask={onUpdateTask}
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className='text-[24px] mt-4'>You have completed all the tasks</div>
      )}
    </div>
  );
}

export default TodoList;
