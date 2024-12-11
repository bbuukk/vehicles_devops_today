'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getVehicles } from '@/api';
import { Vehicle } from '@/types';

export default function VehicleFilter() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedMakeId, setSelectedMakeId] = useState('');
  const [selectedModelYear, setSelectedModelYear] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVehicles()
      .then(({ Results }) => {
        setVehicles(Results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
        setIsLoading(false);
      });
  }, []);

  const currentYear = new Date().getFullYear();
  const modelYears = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, index) => currentYear - index
  );

  const isNextLinkActive =
    Boolean(selectedMakeId) && Boolean(selectedModelYear);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 flex flex-col gap-4 rounded-md bg-white p-10 shadow-md lg:m-24">
      <div>
        <label className="block w-full" htmlFor="make-select">
          Select Make:{' '}
        </label>

        <select
          className="w-full rounded-md"
          id="make-select"
          value={selectedMakeId}
          onChange={(e) => setSelectedMakeId(e.target.value)}
        >
          <option value="">Unselected</option>

          {vehicles.map((v) => (
            <option key={v.MakeId} value={v.MakeId}>
              {v.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block w-full" htmlFor="model-year-select">
          Select model year:
        </label>

        <select
          className="w-full rounded-md"
          id="model-year-select"
          value={selectedModelYear}
          onChange={(e) => setSelectedModelYear(e.target.value)}
        >
          <option value="">Unselected</option>

          {modelYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <Link
        href={`/result/${selectedMakeId}/${selectedModelYear}`}
        className={`mt-6 w-full rounded-md bg-gray-400 p-1 text-center ${!isNextLinkActive ? 'pointer-events-none text-gray-300' : 'text-black transition-all duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-500'}`}
        onClick={(e) => {
          if (!isNextLinkActive) {
            e.preventDefault();
          }
        }}
      >
        Next
      </Link>
    </div>
  );
}
