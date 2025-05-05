import LocationsListItem from "../locations-list-item";
import styles from "./index.module.css";
import { LocationType } from "@/mongoose/locations/schema";

interface Props { locations: LocationType[]; }

export default function LocationsList({ locations }: Props) {
  return (
    <ul className={styles.root}>
      {locations.map((loc) => (
        <LocationsListItem location={loc} key={loc.location_id} />
      ))}
    </ul>
  );
}
