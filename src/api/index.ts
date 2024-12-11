import { VehicleResponse } from "@/types";

export async function getVehicles(): Promise<VehicleResponse> {
  const res = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",
  );

  const data: VehicleResponse = await res.json();

  return data;
}
