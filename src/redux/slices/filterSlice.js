import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'popularity',
    sortProperty: 'rating',
  },
  order: 'desc',
  showSortList: false,
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
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
      state.showSortList = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.currentPage = parseInt(action.payload.currentPage) || 1;
    },
  },
});

export const filterSelector = (state) => state.filter;

export const {
  setSearchValue,
  setCategoryId,
  setSortProperty,
  setSortOrder,
  setShowSortList,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
