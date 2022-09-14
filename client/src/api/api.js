import axios from "axios";

const BaseUrl = "http://tasks.com/";

const API = axios.create({
  baseURL: BaseUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 30000,
  responseType: "json",
});

export const getTasks = async () => {
  const { data } = await API.get(`/api/tasks`);

  return data.map((task) => transformTask(task));
};

export const createTask = async (newTask) => {
  const { data } = await API.post(`/api/tasks`, newTask);

  return transformTask(data);
};

export const updateTask = async (updatedTask) => {
  const { data } = await API.put(`/api/tasks/${updatedTask.id}`, updatedTask);

  return transformTask(data);
};

export const deleteTask = async (id) => {
  await API.delete(`/api/tasks/${id}`);
};

const transformTask = (rawTask) => {
  return {
    ...rawTask,
    datetime: new Date(rawTask.datetime),
  };
};
