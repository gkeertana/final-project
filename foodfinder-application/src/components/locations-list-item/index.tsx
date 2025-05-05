import Link from "next/link";
import styles from "./index.module.css";
import { LocationType } from "@/mongoose/locations/schema";

interface Props { location: LocationType; }

export default function LocationsListItem({ location }: Props) {
  return (
    <li className={styles.root}>
      <Link href={`/location/${location.location_id}`}>
        <h2>
          {location.name}
          <small>
            {location.cuisine} in {location.borough}
          </small>
        </h2>
      </Link>
    </li>
  );
}
