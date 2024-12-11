import { getModelsForMakeIdYear } from '@/api';
import { modelsForMakeIdYearRequestParams, VehicleModel } from '@/types';

export interface ModelsData {
  models: VehicleModel[];
  error: string | null;
}

export async function getVehicleModels(
  params: modelsForMakeIdYearRequestParams
): Promise<ModelsData> {
  try {
    const { Results } = await getModelsForMakeIdYear(params);
    return {
      models: Results,
      error: null
    };
  } catch (err) {
    return {
      models: [],
      error: 'Failed to fetch vehicle models. Please try again later.'
    };
  }
}
