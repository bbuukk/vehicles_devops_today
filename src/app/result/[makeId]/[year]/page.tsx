import { getVehicles } from "@/api";
import Head from "next/head";
import { modelsForMakeIdYearRequestParams } from "@/types";
import VehiclesModelsGrid from "@/comps/ModelsGrid";
import { getVehicleModels } from "@/hooks/useGetVehicleModels";

export default async function Result({
  params,
}: {
  params: modelsForMakeIdYearRequestParams;
}) {
  const { models, error } = await getVehicleModels(params);

  const makeName = models[0]?.Make_Name || params.makeId;
  const pageTitle = `Vehicle Models for ${makeName} in ${params.year}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`List of vehicle models for make ${makeName} in the year ${params.year}`}
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between lg:p-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">
            Vehicle Models for {makeName} in year {params.year}
          </h1>

          <VehiclesModelsGrid models={models} error={error} />
        </div>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const { Results: vehicles } = await getVehicles();

  const vehiclesMakeIds = vehicles.map((v) => v.MakeId);

  const currentYear = new Date().getFullYear();
  const modelYears = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, index) => currentYear - index,
  );

  const params: modelsForMakeIdYearRequestParams[] = [];

  for (const makeId of vehiclesMakeIds) {
    for (const year of modelYears) {
      params.push({
        makeId: makeId.toString(),
        year: year.toString(),
      });
    }
  }

  return params;
}
