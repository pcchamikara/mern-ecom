import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_URL } from '../constants';
import { BACKEND_BASE } from '../constants/backendConstants';

const localStorageUserinfo = JSON.parse(localStorage.getItem('userInfo'));
const initialState = {
  userInfo: localStorageUserinfo ? localStorageUserinfo : [],
  status: '',
  error: null,
  userList: {},
  editUser: {},
};

/* const backendRequset = (requestData) => {
  const {token, url, formDada } = requestData;

  const API = axios.create({baseUrl : BACKEND_BASE});
  if (token) {
    API.interceptors.request.use(
      function (req) {
        req.headers.Authorization = `Bearer ${token}`;
        return req;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}; */

const requestHeader = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

export const userLogin = createAsyncThunk(
  'user/userLogin',
  async (userData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const data = {
        email: userData.email,
        password: userData.password,
      };
      const response = await axios.post(
        'http://localhost:4000/api/users/login',
        data
      );
      return response.data;
    } catch (err) {
      return err.response && err.response.message
        ? err.response.message
        : err.message;
    }
  }
);

export const userReister = createAsyncThunk(
  'user/userReister',
  async (userData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const data = {
        email: userData.email,
        name: userData.name,
        password: userData.password,
      };
      const response = await axios.post(
        'http://localhost:4000/api/users',
        data
      );
      return response.data;
    } catch (err) {
      return err.response && err.response.message
        ? err.response.message
        : err.message;
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const data = {
        email: userData.email,
        name: userData.name,
        password: userData.password,
      };
      const response = await axios.put(
        'http://localhost:4000/api/users/profile',
        data,
        config
      );
      return response.data;
    } catch (err) {
      return err.response && err.response.message
        ? err.response.message
        : err.message;
    }
  }
);

export const updateUserById = createAsyncThunk(
  'user/updateUser',
  async ({ userData, token, userId, toast, navigate }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        email: userData.email,
        name: userData.name,
        password: userData.password,
        isAdmin: userData.isAdmin,
      };
      const response = await axios.put(
        `${BACKEND_BASE}/users/${userId}`,
        data,
        config
      );
      navigate('/admin/user-list');
      toast.success('User successfully updaed !');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserList = createAsyncThunk('user/userList', async (token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BACKEND_BASE}/users`, config);
    return response.data;
  } catch (err) {
    return err.response && err.response.message
      ? err.response.message
      : err.message;
  }
});

export const deleteUser = createAsyncThunk(
  'user/userDelete',
  async ({ userId, token, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BACKEND_BASE}/users/${userId}`,
        requestHeader(token)
      );
      toast.success(`User ${userId} successfully deleted !`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE}/users/${id}`,
        requestHeader(token)
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

/* export const deleteUser = createAsyncThunk(
  'user/userDelete',
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${BACKEND_BASE}/users/${userId}`,
        config
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
); */

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut(state, action) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('cart');
      state.userInfo = [];
      state.itemList = [];
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [userLogin.fulfilled]: (state, action) => {
      if (action.payload.message) {
        state.error = action.payload.message;
      } else {
        state.userInfo = action.payload;
      }
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      state.status = 'scceeded';
    },
    [userLogin.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'faild';
    },
    /* Register */
    [userReister.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [userReister.fulfilled]: (state, action) => {
      if (action.payload.message) {
        state.error = action.payload.message;
      } else {
        state.userInfo = action.payload;
      }
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      state.status = 'scceeded';
    },
    [userReister.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'faild';
    },
    /* update user */
    [updateUser.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [updateUser.fulfilled]: (state, action) => {
      if (action.payload.message) {
        state.error = action.payload.message;
      } else {
        state.userInfo = action.payload;
      }

      state.status = 'scceeded';
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    [updateUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'faild';
    },
    /* get user list*/
    [getUserList.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [getUserList.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload.message) {
        state.error = action.payload.message;
      } else {
        state.userList = action.payload;
      }
      state.status = 'scceeded';
    },
    [getUserList.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'faild';
    },
    /* delete user*/
    [deleteUser.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [deleteUser.fulfilled]: (state, action) => {
      const updatedUsers = state.userList.filter(
        (user) => user._id !== action.meta.arg.userId
      );
      state.userList = updatedUsers;
      console.log('admin', action);
      state.status = 'scceeded';
    },
    [deleteUser.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.status = 'faild';
    },
    /* get user by id*/
    [getUserById.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [getUserById.fulfilled]: (state, action) => {
      state.editUser = action.payload;
      state.status = 'scceeded';
    },
    [getUserById.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.status = 'faild';
    },
    /* update user by id*/
    [updateUserById.pending]: (state) => {
      state.error = null;
      state.status = 'loading';
    },
    [updateUserById.fulfilled]: (state, action) => {
      state.editUser = action.payload;
      state.status = 'scceeded';
    },
    [updateUserById.rejected]: (state, action) => {
      state.error = action.payload.message
        ? action.payload.message
        : action.payload;
      state.status = 'faild';
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
