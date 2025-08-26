import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companiesToShow: "all", // "all", || "awaiting" || "published"
  selectedCompanyId: null,
  searchCompanyNameQuery: "",
  companyInfoActiveTab: "overview",
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCompaniesToShow: (state, action) => {
      state.companiesToShow = action.payload;
    },

    setSelectedCompanyId: (state, action) => {
      state.selectedCompanyId = action.payload;
    },

    setSearchCompanyNameQuery: (state, action) => {
      state.searchCompanyNameQuery = action.payload;

      // Clear selected company whenever the search query changes
      state.selectedCompanyId = null;
    },

    setCompanyInfoActiveTab: (state, action) => {
      state.companyInfoActiveTab = action.payload;
    },

    clearCompaniesData: () => initialState,
  },
});

export const {
  setCompaniesToShow,
  setSelectedCompanyId,
  setSearchCompanyNameQuery,
  setCompanyInfoActiveTab,
  clearCompaniesData,
} = companiesSlice.actions;

export default companiesSlice.reducer;
