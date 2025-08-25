import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companiesToShow: "all", // "all", || "awaiting" || "published"
  selectedCompanyId: null,
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

    setCompanyInfoActiveTab: (state, action) => {
      state.companyInfoActiveTab = action.payload;
    },

    clearCompaniesData: () => initialState,
  },
});

export const {
  setCompaniesToShow,
  setSelectedCompanyId,
  setCompanyInfoActiveTab,
  clearCompaniesData,
} = companiesSlice.actions;

export default companiesSlice.reducer;
