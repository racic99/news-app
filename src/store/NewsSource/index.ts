import { createSlice } from '@reduxjs/toolkit';
import { NewsSource } from 'types/NewsSource';

export type InitialNewsSourcesStateType = {
  newsSources: NewsSource[];
};

const initialNewsSourcesState: InitialNewsSourcesStateType = {
  newsSources: [],
};

const newsSourceSlice = createSlice({
  name: 'newsSource',
  initialState: initialNewsSourcesState,
  reducers: {
    setNewsSources: (
      state,
      { payload: newsSources }: { payload: NewsSource[] },
    ) => {
      state.newsSources = newsSources;
    },
  },
});

export const { setNewsSources } = newsSourceSlice.actions;

export default newsSourceSlice.reducer;
