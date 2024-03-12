//import { createSelector } from '@reduxjs/toolkit';

export const selectProducts = (state) => state.products.items;
export const selectFilter = (state) => state.filters;
export const selectCategories = (state) => state.categories.items;
export const selectCategoriesIsLoading = (state) => state.categories.isLoading;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectError = (state) => state.products.error;
