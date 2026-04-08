import { RecordBrowser } from "@/components/record-browser";
import { getProcessFieldSettings } from "@/lib/field-settings-service";
import { locations } from "@/lib/mock-data";

export default async function LocationsPage() {
  const fieldSettings = await getProcessFieldSettings("locations");
  const visibleKeys = ["code", "zone", "aisle", "bin", "capacity", "status"];

  return (
    <RecordBrowser
      title="Location Master"
      basePath="/locations"
      columns={visibleKeys.map((key) => ({
        key,
        label: fieldSettings.find((field) => field.key === key)?.label ?? key,
      }))}
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
