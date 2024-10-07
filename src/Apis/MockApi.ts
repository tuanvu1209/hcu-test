import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 500 });

const tasks = [
  { id: 1, title: 'Task 1', completed: false, type: 0 },
  { id: 2, title: 'Task 2', completed: true, type: 0 },
  { id: 3, title: 'Task 3', completed: false, type: 0 },
  { id: 5, title: 'Task 5', completed: false, type: 0 },
  { id: 6, title: 'Task 6', completed: false, type: 1 },
  { id: 7, title: 'Task 7', completed: false, type: 1 },
];

export function setupMockApi() {
  mock.onGet('/tasks').reply(200, tasks);

  mock.onPost('/tasks').reply((config) => {
    const newTask = JSON.parse(config.data);
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    return [201, newTask];
  });

  mock.onPatch(/\/tasks\/\d+/).reply((config) => {
    const url = config.url;
    
    if (!url) {
      return [400, { message: 'Invalid request, URL is missing' }];
    }

    const id = parseInt(url.split('/').pop() as string);
    const updatedTask = JSON.parse(config.data);
    const index = tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      return [200, tasks[index]];
    } else {
      return [404, { message: 'Task not found' }];
    }
  });

  mock.onDelete(/\/tasks\/\d+/).reply((config) => {
    const url = config.url;
    
    if (!url) {
      return [400, { message: 'Invalid request, URL is missing' }];
    }

    const id = parseInt(url.split('/').pop() as string);
    const index = tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      tasks.splice(index, 1);
      return [204];
    } else {
      return [404, { message: 'Task not found' }];
    }
  });
}
