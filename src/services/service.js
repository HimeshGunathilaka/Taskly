import axios from "axios";

const api = "http://localhost:8000/api";

const signIn = async (values) => {
  try {
    const result = await axios.post(`${api}/users/sign-in`, values);

    return {
      message: result?.data.message,
      data: result?.data.data,
      status: result.status,
    };
  } catch (error) {
    return { message: error.response.data.message, status: 500 };
  }
};

const signUp = async (values) => {
  try {
    const result = await axios.post(`${api}/users/sign-up`, values);

    return {
      message: result?.data.message,
      data: result?.data.data,
      status: result.status,
    };
  } catch (error) {
    return { message: error.response.data.message, status: 500 };
  }
};

const createTask = async (values) => {
  try {
    console.log(values);
    const result = await axios.post(`${api}/tasks/create-task`, values);

    return {
      message: result?.data.message,
      data: result?.data.data,
      status: result.status,
    };
  } catch (error) {
    return { message: error.response.data.message, status: 500 };
  }
};

const updateTask = async (id, values) => {
  try {
    const result = await axios.put(`${api}/tasks/update-task/${id}`, values);

    return {
      message: result?.data.message,
      data: result?.data.data,
      status: result.status,
    };
  } catch (error) {
    return { message: error.response.data.message, status: 500 };
  }
};

const updateTaskStatusToCompleted = async (id) => {
  try {
    const result = await axios.put(`${api}/tasks/update-task-status/${id}`);

    return {
      message: result?.data.message,
      data: result?.data.data,
      status: result.status,
    };
  } catch (error) {
    return { message: error.response.data.message, status: 500 };
  }
};

const getTasks = async () => {
  try {
    const result = await axios.get(`${api}/tasks/`);

    return {
      message: result?.data.message,
      data: result?.data.data,
      status: result.status,
    };
  } catch (error) {
    return { message: error.response.data.message, status: 500 };
  }
};

const deleteTask = async (id) => {
  try {
    const result = await axios.delete(`${api}/tasks/delete-task/${id}`);

    return {
      message: result?.data.message,
      data: result?.data.data,
      status: result.status,
    };
  } catch (error) {
    return { message: error.response.data.message, status: 500 };
  }
};

export default {
  signIn,
  signUp,
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  updateTaskStatusToCompleted,
};
