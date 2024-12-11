"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getVehicles } from "@/api";
import { Vehicle } from "@/types";

export default function VehicleFilter() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedMakeId, setSelectedMakeId] = useState("");
  const [selectedModelYear, setSelectedModelYear] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVehicles()
      .then(({ Results }) => {
        setVehicles(Results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setIsLoading(false);
      });
  }, []);

  const currentYear = new Date().getFullYear();
  const modelYears = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, index) => currentYear - index,
  );

  const isNextLinkActive =
    Boolean(selectedMakeId) && Boolean(selectedModelYear);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <label htmlFor="make-select">Select Make: </label>
        <select
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
        <label htmlFor="model-year-select">Select model year:</label>
        <select
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
        className={`${!isNextLinkActive ? "link--inactive" : "link--active"}`}
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
