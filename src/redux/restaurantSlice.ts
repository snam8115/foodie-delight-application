import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockRestaurants } from '../utils/mockDB';

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  cuisine: string;
}

interface RestaurantState {
  restaurants: Restaurant[];
  allRestaurants: Restaurant[];
  paginatedRestaurants: Restaurant[];
  currentPage: number;
  totalPages: number;
}

const initialState: RestaurantState = {
  restaurants: mockRestaurants,
  allRestaurants: mockRestaurants,
  paginatedRestaurants: [],
  currentPage: 1,
  totalPages: Math.ceil(mockRestaurants.length / 5),
};

const ITEMS_PER_PAGE = 5;
const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    addRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.restaurants.unshift(action.payload);
    },
    updateRestaurant: (state, action: PayloadAction<Restaurant>) => {
      const index = state.restaurants.findIndex(
        (r) => r.id === action.payload.id
      );
      if (index !== -1) {
        state.restaurants[index] = action.payload;
      }
    },
    deleteRestaurant: (state, action: PayloadAction<string>) => {
      state.restaurants = state.restaurants.filter(
        (r) => r.id !== action.payload
      );
    },
    setPaginatedRestaurants(state, action: PayloadAction<Restaurant[]>) {
      state.paginatedRestaurants = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    calculatePagination(state) {
      state.totalPages = Math.ceil(state.restaurants.length / ITEMS_PER_PAGE);
      const startIndex = (state.currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      state.paginatedRestaurants = state.restaurants.slice(
        startIndex,
        endIndex
      );
    },
  },
});

export const {
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  setPaginatedRestaurants,
  setCurrentPage,
  calculatePagination,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
