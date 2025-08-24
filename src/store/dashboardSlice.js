import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import baseApiUrl from "@/lib/baseApiUrl";

const initialState = {
  visitors: {
    stats: null,
  },
  companies: {
    stats: null,
    list: [],
  },
  isLoading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async () => {
    // const response = await fetch("/api/api.php");

    const response = await fetch(`${baseApiUrl()}`);
    const responseData = await response.json();

    return responseData.data;
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;

        state.visitors.stats = action.payload.visitor_stats;
        state.companies.stats = action.payload.companies_stats;
        state.companies.list = action.payload.companies;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { clearDashboardData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
