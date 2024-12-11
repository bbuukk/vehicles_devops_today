import { ModelsData } from "@/hooks/useGetVehicleModels";

export default function VehiclesModelsGrid({ models, error }: ModelsData) {
  if (error) {
    return <p className="text-center">Error occured, try again later</p>;
  }

  if (models.length === 0) {
    return <p className="text-center">No results found</p>;
  }

  return (
    <ul
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center"
      role="list"
    >
      {models.map((model) => (
        <li key={model.Model_ID} className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">{model.Model_Name}</h2>
        </li>
      ))}
    </ul>
  );
}
