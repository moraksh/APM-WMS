import { RecordBrowser } from "@/components/record-browser";
import { locations } from "@/lib/mock-data";

export default function LocationsPage() {
  return (
    <RecordBrowser
      title="Location Master"
      basePath="/locations"
      columns={[
        { key: "code", label: "Code" },
        { key: "zone", label: "Zone" },
        { key: "aisle", label: "Aisle" },
        { key: "bin", label: "Bin" },
        { key: "capacity", label: "Capacity" },
        { key: "status", label: "Status" },
      ]}
      rows={locations.map((location) => ({
        id: location.code,
        values: {
          code: location.code,
          zone: location.zone,
          aisle: location.aisle,
          bin: location.bin,
          capacity: location.capacity,
          status: location.status,
        },
      }))}
    />
  );
}
