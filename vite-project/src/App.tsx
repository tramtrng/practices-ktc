import { Routes, Route, BrowserRouter } from "react-router";
import Sidebar from "./components/Homework_W2_D7/Components/Sidebar";
import PatientsPage from "./components/Homework_W2_D7/Pages/PatientsPage";
import OverviewPage from "./components/Homework_W2_D7/Pages/OverviewPage";
import MapPage from "./components/Homework_W2_D7/Pages/MapPage";
import DepartmentsPage from "./components/Homework_W2_D7/Pages/DepartmentsPage";
import HistoryPage from "./components/Homework_W2_D7/Pages/HistoryPage";
import DoctorsPage from "./components/Homework_W2_D7/Pages/DoctorsPage";
import SettingsPage from "./components/Homework_W2_D7/Pages/SettingsPage";
import { FaBell, FaSearch } from "react-icons/fa";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
            <div className="flex items-center w-full max-w-md">
              <div className="relative w-full">
                <span className="absolute left-3 inset-y-0 flex items-center text-gray-400">
                  <FaSearch className="text-sm" />
                </span>

                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
              <FaBell className="text-gray-500 text-lg cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <span className="text-sm font-medium text-gray-700">
                Emma Kwan
              </span>
            </div>
          </div>

          <div className="p-6 flex-1 bg-gray-50">
            <Routes>
              <Route path="/" element={<PatientsPage />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
