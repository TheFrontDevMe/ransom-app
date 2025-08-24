import { configureStore } from "@reduxjs/toolkit";

import dashboardSlice from "./dashboardSlice";
import companiesSlice from "./companiesSlice";
import fileExplorerSlice from "./fileExplorerSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    companies: companiesSlice,
    fileExplorer: fileExplorerSlice,
  },
});
