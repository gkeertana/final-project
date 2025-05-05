import { LocationType } from "@/mongoose/locations/schema";
import styles from "./index.module.css";

interface Props { location: LocationType; }

export default function LocationDetail({ location }: Props) {
  return (
    <ul className={styles.root}>
      <li><b>Address:</b> {location.address}</li>
      <li><b>Zipcode:</b> {location.zipcode}</li>
      <li><b>Borough:</b> {location.borough}</li>
      <li><b>Cuisine:</b> {location.cuisine}</li>
      <li><b>Grade:</b> {location.grade}</li>
    </ul>
  );
}
