import { Vehicle, ApiResponse, VehicleModel } from "@/types";
import { modelsForMakeIdYearRequestParams } from "@/types";

async function getVehicles(): Promise<ApiResponse<Vehicle>> {
  const res = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",
  );

  const data = await res.json();

  return data;
}

//TODO: introduce types to it
async function getModelsForMakeIdYear({
  makeId,
  year,
}: modelsForMakeIdYearRequestParams): Promise<ApiResponse<VehicleModel>> {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
  );
  const data = await res.json();

  return data;
}

export { getVehicles, getModelsForMakeIdYear };
