interface Vehicle {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

interface VehicleResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: Vehicle[];
}

export type { VehicleResponse, Vehicle };
