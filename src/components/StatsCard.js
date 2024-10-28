'use client';

import { useEffect, useState } from 'react';

const StatsCard = ({ capsules }) => {
  const [totalCapsules, setTotalCapsules] = useState(0);
  const [totalActiveCapsules, setTotalActiveCapsules] = useState(0);
  const [totalDestroyedCapsules, setTotalDestroyedCapsules] = useState(0);

  useEffect(() => {
    setTotalCapsules(capsules.length);
    setTotalActiveCapsules(capsules.filter(capsule => capsule.status === 'active').length);
    setTotalDestroyedCapsules(capsules.filter(capsule => capsule.status === 'destroyed').length);
  }, [capsules]);

  return (
    <div className="container mx-auto px-0 md:px-4">
      <div className="grid grid-cols-1 gap-4 mb-3 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-slate-800 shadow-md rounded-lg p-2 md:p-4 flex flex-col md:items-center w-1/2 md:w-full">
          <h2 className="text-base font-bold text-white mb-2 md:text-lg lg:text-xl">Total Capsules</h2>
          <p className="text-lg text-white lg:text-xl">{totalCapsules}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-2 md:p-4 flex flex-col md:items-center w-1/2 md:w-full">
          <h2 className="text-base font-bold text-slate-700 mb-2 md:text-lg lg:text-xl">Total Active Capsules</h2>
          <p className="text-lg text-slate-700 lg:text-xl">{totalActiveCapsules}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-2 md:p-4 flex flex-col md:items-center w-1/2 md:w-full">
          <h2 className="text-base font-bold text-slate-700 mb-2 md:text-lg lg:text-xl">Total Destroyed Capsules</h2>
          <p className="text-lg text-slate-700 lg:text-xl">{totalDestroyedCapsules}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;