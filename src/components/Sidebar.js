// components/Sidebar.js
import { FaHome, FaFlag, FaChartPie, FaEnvelope, FaImages, FaCalendarAlt, FaUsers, FaCog, FaSignOutAlt, FaSearch } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <aside className="w-15 items-center bg-gray-400 text-black min-h-screen md:p-4 p-3 m-0">
            <ul>
                <li className="flex items-center mb-10 cursor-pointer hover:bg-gray-300 rounded-lg p-1 md:p-2 transition-transform transform hover:scale-110">
                    <FaSearch />
                </li>
                <li className="flex items-center mb-10 cursor-pointer hover:bg-gray-300 rounded-lg p-1 md:p-2 transition-transform transform hover:scale-110">
                    <FaHome />
                </li>
                <li className="flex items-center mb-10 cursor-pointer hover:bg-gray-300 rounded-lg p-1 md:p-2 transition-transform transform hover:scale-110">
                    <FaFlag />
                </li>
                <li className="flex items-center mb-10 cursor-pointer hover:bg-gray-300 rounded-lg p-1 md:p-2 transition-transform transform hover:scale-110">
                    <FaChartPie />
                </li>
                <li className="flex items-center mb-10 cursor-pointer hover:bg-gray-300 rounded-lg p-1 md:p-2 transition-transform transform hover:scale-110">
                    <FaEnvelope />
                </li>
                <li className="flex items-center mb-10 cursor-pointer hover:bg-gray-300 rounded-lg p-1 md:p-2 transition-transform transform hover:scale-110">
                    <FaImages />
                </li>
                <li className="flex items-center mb-10 cursor-pointer hover:bg-gray-300 rounded-lg p-1 md:p-2 transition-transform transform hover:scale-110">
                    <FaCalendarAlt />
                </li>
                <li className="flex items-center mb-10 cursor-pointer hover:bg-gray-300 rounded-lg p-1 md:p-2 transition-transform transform hover:scale-110">
                    <FaUsers />
                </li>
                <li className="flex items-center mb-10 cursor-pointer hover:bg-gray-300 rounded-lg p-1 md:p-2 transition-transform transform hover:scale-110">
                    <FaCog />
                </li>
                <li className="flex items-center mb-10 cursor-pointer hover:bg-gray-300 rounded-lg p-1 md:p-2 transition-transform transform hover:scale-110">
                    <FaSignOutAlt />
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;