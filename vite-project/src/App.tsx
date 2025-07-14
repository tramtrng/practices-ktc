import { BrowserRouter, Routes, Route, Link } from "react-router";
import { UserProvider } from "./components/Test/components/UserProvider";
import UserForm from "./components/Test/components/UserForm";
import UserList from "./components/Test/components/UserList";
import UserDetails from "./components/Test/components/UserDetails";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <nav className="flex flex-row items-center justify-between py-5 px-8 bg-blue-50 shadow mb-8 rounded-b-xl">
          <div className="flex items-center gap-2">
            <span>
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span className="text-2xl font-bold text-blue-700 tracking-wide">User Management</span>
          </div>
          <div className="flex gap-4">
            <Link
              to="/"
              className="px-4 py-2 rounded font-semibold text-blue-700 hover:bg-blue-100 transition"
            >
              Home
            </Link>
            <Link
              to="/users"
              className="px-4 py-2 rounded font-semibold text-blue-700 hover:bg-blue-100 transition"
            >
              Users
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}