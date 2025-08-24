import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import baseApiUrl from "@/lib/baseApiUrl";

const initialState = {
  dataByPath: {}, // { path: file | folder ... }
  openFoldersByPath: {}, // { path: { folderName: true | false } }
  loadingByPath: {}, // { path: true | false  }
  successByPath: {}, // { path: true | false  }
  errorByPath: {}, // { path: error | null  }
};

export const fetchCompanyStorageData = createAsyncThunk(
  "fileExplorer/fetchCompanyStorageData",
  async ({ companyId, path = "/" }) => {
    console.log(
      "fetchCompanyStorageData",
      `${baseApiUrl()}?company_id=${companyId}&path=${path}`,
    );

    const response = await fetch(
      `${baseApiUrl()}?company_id=${companyId}&path=${path}`,
    );

    const { status, data } = await response.json();

    return { path, status, data };
  },
);

const fileExplorerSlice = createSlice({
  name: "fileExplorer",
  initialState,
  reducers: {
    toggleFolder: (state, action) => {
      const { path, folderName } = action.payload;

      state.openFoldersByPath[path] = {
        ...(state.openFoldersByPath[path] || {}),
        [folderName]: !state.openFoldersByPath[path]?.[folderName],
      };
    },

    clearFileExplorerData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyStorageData.pending, (state, action) => {
        state.loadingByPath[action.meta.arg.path] = true;
      })
      .addCase(fetchCompanyStorageData.fulfilled, (state, action) => {
        const { path, status, data } = action.payload;

        state.loadingByPath[action.meta.arg.path] = false;
        state.successByPath[action.meta.arg.path] = status;

        if (status) {
          state.errorByPath[action.meta.arg.path] = null;
          state.dataByPath[path] = data;
        } else {
          state.errorByPath[action.meta.arg.path] = data;
        }
      })
      .addCase(fetchCompanyStorageData.rejected, (state, action) => {
        state.loadingByPath[action.meta.arg.path] = false;
        state.successByPath[action.meta.arg.path] = false;
        state.errorByPath[action.meta.arg.path] =
          action.error.message || action.error;
      });
  },
});

//
export const selectDataByPath = (path) =>
  createSelector(
    (state) => state.fileExplorer.dataByPath,
    (dataByPath) => dataByPath[path] || [],
  );

export const { toggleFolder, clearFileExplorerData } =
  fileExplorerSlice.actions;

export default fileExplorerSlice.reducer;
