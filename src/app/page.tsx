import Loader from "@/comps/Loader";
import VehicleFilter from "@/comps/VehiclesFilter";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<Loader />}>
        <VehicleFilter />
      </Suspense>
    </main>
  );
}
