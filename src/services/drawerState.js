import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    open: false
  },
  reducers: {
    toggleDrawer: state => {
      state.open = !state.open;
    }
  }
});

export const { toggleDrawer } = drawerSlice.actions;

export const selectDrawerOpen = state => state.drawer.open;

export default drawerSlice.reducer;