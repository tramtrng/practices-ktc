import { NavLink } from 'react-router';
import {
  FaUserInjured,
  FaChartPie,
  FaMapMarkedAlt,
  FaBuilding,
  FaUserMd,
  FaHistory,
  FaCog,
  FaPlus,
} from 'react-icons/fa';

const menuItems = [
  { name: 'Patients', path: '/', icon: <FaUserInjured /> },
  { name: 'Overview', path: '/overview', icon: <FaChartPie /> },
  { name: 'Map', path: '/map', icon: <FaMapMarkedAlt /> },
  { name: 'Departments', path: '/departments', icon: <FaBuilding /> },
  { name: 'Doctors', path: '/doctors', icon: <FaUserMd /> },
  { name: 'History', path: '/history', icon: <FaHistory /> },
  { name: 'Settings', path: '/settings', icon: <FaCog /> },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r px-4 py-6 flex flex-col justify-between h-screen">
      <div>
       <div className="flex items-center gap-2 mb-6">
  <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    <FaPlus />
  </button>
  <h1 className="text-2xl font-bold">H-care</h1>
</div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
  key={item.name}
  to={item.path}
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-700 hover:bg-gray-100'
    }`
  }
  end
>
  {item.icon}
  <span>{item.name}</span>
</NavLink>

          ))}
        </nav>
      </div>
    </div>
  );
}
