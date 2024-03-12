import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://dream-team-backend-10w1.onrender.com/';

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('api/users/register', credentials);
      setAuthHeader(res.data.data.token);

      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('api/users/login', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    if (!token) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(token);
      const res = await axios.get('api/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('api/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUserInfo = createAsyncThunk(
  'auth/update',
  async (params, thunkAPI) => {
    try {
      const res = await axios.patch('api/users/update', params);
      Notiflix.Notify.success('Information is updated.');
      return res.data;
    } catch (error) {
      Notiflix.Notify.failure('Error! Try again.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'auth/avatar',
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const res = await axios.patch('api/users/avatars', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });

      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
      console.log(file);
    }
  }
);

export const instance = axios.create({
  baseURL: 'https://leader-code-team-power-pulse-back-end.onrender.com/',
});
