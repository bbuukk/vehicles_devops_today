"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getVehicles } from "@/api";

export default function VehicleFilter() {
  const { Results: vehicles } = use(getVehicles());

  const [selectedMakeId, setSelectedMakeId] = useState<string>("");
  const [selectedModelYear, setSelectedModelYear] = useState<string>("");

  const currentYear = new Date().getFullYear();
  const modelYears = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, index) => currentYear - index,
  );

  const isNextLinkActive =
    Boolean(selectedMakeId) && Boolean(selectedModelYear);

  return (
    <div>
      <p>{selectedMakeId}</p>
      <p>{selectedModelYear}</p>
      <div>
        <label htmlFor="make-select">Select Make: </label>
        <select
          id="make-select"
          onChange={(e) => setSelectedMakeId(e.target.value)}
        >
          <option value={""}>Unselected</option>
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
          <option value={""}>Unselected</option>
          {modelYears.map((make) => (
            <option key={make} value={make}>
              {make}
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
