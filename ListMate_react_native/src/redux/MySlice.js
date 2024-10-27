import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  hasUnlockAll: false,
};

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    setHasUnlockAll(state, action) {
      state.hasUnlockAll = action.payload;
    },
  },
});

export const {setHasUnlockAll} = mySlice.actions;
export default mySlice.reducer;
