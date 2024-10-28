// ./src/app/page.tsx
'use client'; // Add this line
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import CapsulesTable from '../components/CapsulesTable'; 
import { useEffect, useState } from 'react';

export default function Home() {
  const [capsules, setCapsules] = useState([]);

  useEffect(() => {
    const fetchCapsules = async () => {
      const response = await fetch('https://api.spacexdata.com/v3/capsules');
      const data = await response.json();
      setCapsules(data);
    };

    fetchCapsules();
  }, []);

  return (
    <div className="flex flex-col min-h-screen"> 
      <Header userName={"Elon Musk"} userRole={"Admin"} />
      <div className="flex flex-1"> 
        <Sidebar />
        <div className="flex-1 p-5 md:p-8"> 
          <StatsCard capsules={capsules} />
          <CapsulesTable capsules={capsules} setCapsules={setCapsules} /> 
        </div>
      </div>
    </div>
  );
}