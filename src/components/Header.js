
import Image from 'next/image';
import defaultImage from './default.jpg'; 
import { FaBars, FaBell } from 'react-icons/fa';

const Header = ({ userName, userRole }) => {
  return (
    <header className="flex items-center justify-between bg-white shadow-md md:w-full w-fit">
      <div className="flex items-center">
        <div className="flex items-center justify-center bg-gray-800 md:p-5 p-5">
          <FaBars className="text-white md:text-2xl text-md cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center ">
        <FaBell className="text-gray-700 text-2xl mr-4" />
        <div className="flex items-center">
          <div className="ml-2 text-gray-700">
            <p className="font-semibold">{userName}</p>
            <p className="text-sm">{userRole}</p>
          </div>
          <Image
            src={defaultImage} 
            alt="User Profile"
            width={70}
            height={70}
            className="rounded-md ml-4"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;