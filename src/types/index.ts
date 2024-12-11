interface Vehicle {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

interface ApiResponse<Tdata> {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: Tdata[];
}

interface modelsForMakeIdYearRequestParams {
  makeId: string;
  year: string;
}

interface VehicleModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export type {
  ApiResponse,
  Vehicle,
  modelsForMakeIdYearRequestParams,
  VehicleModel,
};
