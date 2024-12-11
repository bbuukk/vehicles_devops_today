import { ModelsData } from '@/hooks/useGetVehicleModels';

export default function VehiclesModelsGrid({ models, error }: ModelsData) {
  if (error) {
    return <p className="text-center">Error occured, try again later</p>;
  }

  if (models.length === 0) {
    return <p className="text-center">No results found</p>;
  }

  return (
    <ul
      className="grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-3"
      role="list"
    >
      {models.map((model) => (
        <li key={model.Model_ID} className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-xl font-semibold">{model.Model_Name}</h2>
        </li>
      ))}
    </ul>
  );
}
