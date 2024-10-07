import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Logo from '../src/assets/images/logo.png';
import { setupMockApi } from './Apis/MockApi';
import './App.css';
import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';
import TodoTabs from './component/TodoTabs';
import { TaskProp } from './types';
import toast, { Toaster } from 'react-hot-toast';
import TodoFilter from './component/TodoFilter';

setupMockApi();

function App() {
  const [tab, setTab] = useState(0);
  const [tasks, setTasks] = useState<TaskProp[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/tasks');
      const filteredTasks = res.data.filter(
        (task: TaskProp) =>
          task.type === tab &&
          (filter === 'all' ||
            (filter === 'completed' ? task.completed : !task.completed))
      );
      setTasks(filteredTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, filter]);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleAdd = async () => {
    if (!newTask.trim()) return;

    const newTasks = tasks.map((item: TaskProp) => item.title);

    if (newTasks.includes(newTask.trim())) {
      toast.error('Task already exists');
      setNewTask('');
      return;
    }
    setLoading(true);

    try {
      const task = {
        id: tasks.length + 1,
        title: newTask,
        type: tab,
        completed: false,
      };
      const res = await axios.post('/tasks', task);
      setTasks((prevTasks) => [...prevTasks, res.data]);
      setNewTask('');
      toast.success('Add task successfully');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (updatedTask: TaskProp) => {
    setLoading(true);
    try {
      const res = await axios.patch(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? res.data : task))
      );
      toast.success('Upload task successfully');
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      toast.success('Delete task successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCompleted = async () => {
    setLoading(true);
    try {
      const completedTasks = tasks.filter((task) => task.completed);
      if (!completedTasks.length) {
        toast.error('No tasks have been completed');
        return;
      }
      await Promise.all(
        completedTasks.map((task) => axios.delete(`/tasks/${task.id}`))
      );
      setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
      toast.success('Delete all completed tasks successfully');
    } catch (error) {
      console.error('Error clearing completed tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Toaster
        position='top-right'
        reverseOrder={false}
      />
      <div className='bg-[#F1ECE6] w-full'>
        <img
          src={Logo}
          alt='logo'
          className='h-[60px] py-[20px] mx-auto'
        />
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TodoTabs
            tab={tab}
            onHandleChange={handleChangeTab}
          />
        </Box>
        <div className='mt-10 flex flex-col items-center px-4'>
          <div className='text-right w-full max-w-[900px] flex gap-10'>
            <TodoForm
              value={newTask}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTask(e.target.value)
              }
              onHandleAdd={handleAdd}
            />
            <TodoFilter
              value={filter}
              onChange={(event: SelectChangeEvent) =>
                setFilter(event.target.value as string)
              }
            />
          </div>
          <div className='w-full max-w-[900px] bg-[#F1ECE6] px-10 mt-5 rounded-[50px] flex flex-col'>
            <TodoList
              list={tasks}
              loading={loading}
              onUpdateTask={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
            <div className='text-right mt-[30px] mb-5'>
              <Button
                onClick={handleClearCompleted}
                sx={{ color: 'red' }}
              >
                Clear Completed
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </main>
  );
}

export default App;
