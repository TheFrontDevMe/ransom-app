import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import baseApiUrl from "@/lib/baseApiUrl";

const initialState = {
  currentDirectory: "", // always store absolute path
  navigationHistory: [""], // stack of visited paths
  navigationHistoryIndex: 0, // pointer in history
  pathData: [],
  searchFileNameQuery: "",
  isLoading: false,
  success: undefined,
  error: null,
};

// --- Helpers ---
async function fetchStorageData(companyId, path = "/") {
  const res = await fetch(
    `${baseApiUrl()}?company_id=${companyId}&path=${path}`,
  );

  const { status, data } = await res.json();

  return { path, status, data };
}

// --- Async thunks ---
export const fetchCompanyStorageData = createAsyncThunk(
  "fileExplorer/fetchCompanyStorageData",
  async ({ companyId, path }) => fetchStorageData(companyId, path),
);

export const changeDirectoryAndFetchCompanyStorageData = createAsyncThunk(
  "fileExplorer/changeDirectoryAndFetchCompanyStorageData",
  async ({ companyId, path }, { dispatch, getState }) => {
    dispatch(goToDirectory(path === "/" ? "" : path));
    dispatch(clearSearchFileNameQuery());

    const { fileExplorer } = getState();

    return fetchStorageData(companyId, fileExplorer.currentDirectory);
  },
);

export const navigateBackwardAndFetchCompanyStorageData = createAsyncThunk(
  "fileExplorer/navigateBackwardAndFetchCompanyStorageData",
  async ({ companyId }, { dispatch, getState }) => {
    dispatch(navigateBackward());
    dispatch(clearSearchFileNameQuery());

    const { fileExplorer } = getState();

    return fetchStorageData(companyId, fileExplorer.currentDirectory);
  },
);

const fileExplorerSlice = createSlice({
  name: "fileExplorer",
  initialState,
  reducers: {
    goToDirectory: (state, action) => {
      state.navigationHistory = state.navigationHistory.slice(
        0,
        state.navigationHistoryIndex + 1,
      );

      state.currentDirectory = state.currentDirectory + action.payload;
      state.navigationHistory.push(state.currentDirectory);
      state.navigationHistoryIndex++;
    },

    navigateBackward: (state) => {
      if (state.navigationHistoryIndex > 0) {
        state.navigationHistoryIndex--;
        state.currentDirectory =
          state.navigationHistory[state.navigationHistoryIndex];
      }
    },

    setSearchFileNameQuery: (state, action) => {
      state.searchFileNameQuery = action.payload;
    },

    clearSearchFileNameQuery: (state) => {
      state.searchFileNameQuery = "";
    },

    clearFileExplorerData: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    const setPending = (state) => {
      state.isLoading = true;
      state.success = undefined;
      state.error = null;
    };

    const setFulfilled = (state, action) => {
      const { path, status, data } = action.payload;

      state.isLoading = false;
      state.success = status;
      state.pathData = status ? data : [];
      state.error = status ? null : data;
    };

    const setRejected = (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.error.message || action.error;
    };

    builder
      .addCase(fetchCompanyStorageData.pending, setPending)
      .addCase(fetchCompanyStorageData.fulfilled, setFulfilled)
      .addCase(fetchCompanyStorageData.rejected, setRejected)

      .addCase(changeDirectoryAndFetchCompanyStorageData.pending, setPending)
      .addCase(
        changeDirectoryAndFetchCompanyStorageData.fulfilled,
        setFulfilled,
      )
      .addCase(changeDirectoryAndFetchCompanyStorageData.rejected, setRejected)

      .addCase(navigateBackwardAndFetchCompanyStorageData.pending, setPending)
      .addCase(
        navigateBackwardAndFetchCompanyStorageData.fulfilled,
        setFulfilled,
      )
      .addCase(
        navigateBackwardAndFetchCompanyStorageData.rejected,
        setRejected,
      );
  },
});

export const {
  goToDirectory,
  navigateBackward,
  setSearchFileNameQuery,
  clearSearchFileNameQuery,
  clearFileExplorerData,
} = fileExplorerSlice.actions;

export default fileExplorerSlice.reducer;
