import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDashboardData } from "./store/dashboardSlice";

import WordLeaksSection from "./components/WordLeaksSection";
import WorldClocksSection from "./components/WorldClocksSection/WorldClocksSection";
import VisitorsSection from "./components/VisitorsSection/VisitorsSection";

import Header from "./components/Header/Header";
import CompaniesSection from "./components/CompaniesSection/CompaniesSection";
import CompanyInfoSection from "./components/CompanyInfoSection/CompanyInfoSection";

import pageCoverImg from "@assets/images/page_cover.svg";

function App() {
  const { isLoading, error } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (isLoading) {
    return <div className="page-wrapper" />;
  }

  if (error) {
    return (
      <div className="page-wrapper text-red-primary">
        Error: {error?.message || String(error)}
      </div>
    );
  }

  return (
    <>
      <div className="page-wrapper">
        {/* Page cover  */}
        <div className="absolute inset-0 h-full w-full px-2 py-5">
          <img src={pageCoverImg} alt="Page cover" />
        </div>

        <main className="relative grid min-h-0 flex-grow grid-cols-[288px_1fr] gap-3">
          {/* Sidebar */}
          <div className="custom-scrollbar grid min-h-0 grid-cols-1 place-content-start gap-2 overflow-auto pt-1.5 pr-1.5">
            <WordLeaksSection />
            <WorldClocksSection />
            <VisitorsSection />
          </div>

          {/* Main Dashboard */}
          <div className="flex min-h-0 flex-col gap-4">
            <Header />
            <div className="grid min-h-0 flex-grow grid-cols-2 gap-1.5">
              <CompaniesSection />

              <CompanyInfoSection />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
