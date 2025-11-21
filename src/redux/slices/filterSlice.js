import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'popularity',
    sortProperty: 'rating',
  },
  order: 'desc',
  showList: false,
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortProperty(state, action) {
      state.sort = action.payload;
    },
    setSortOrder(state, action) {
      state.order = action.payload;
    },
    setShowSortList(state, action) {
      state.showList = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSortProperty, setSortOrder, setShowSortList, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
