import { createSlice } from '@reduxjs/toolkit';

export const authTokenSlice = createSlice({
  name: 'authToken',
  initialState: {
    value: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { setToken } = authTokenSlice.actions;

export const selectAuthTokenValue = state => state.authToken.value;

export default authTokenSlice.reducer;