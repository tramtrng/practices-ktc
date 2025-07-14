import { BrowserRouter, Routes, Route, Link } from "react-router";
import { UserProvider } from "./components/Test/components/UserProvider";
import UserForm from "./components/Test/components/UserForm";
import UserList from "./components/Test/components/UserList";
import UserDetails from "./components/Test/components/UserDetails";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <nav className="flex gap-4 justify-center items-center py-4 bg-blue-50 shadow mb-6 rounded-b-lg">
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