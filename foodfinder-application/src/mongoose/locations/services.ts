import Locations from "./model";
import { LocationType } from "./schema";
import { FilterLocationType, FilterWishlistType } from "./custom";
import { QueryOptions } from "mongoose";

async function findLocations(
  filter: FilterLocationType | FilterWishlistType | {}
): Promise<LocationType[]> {
  try {
    return (await Locations.find(filter)) as LocationType[];
  } catch {
    return [];
  }
}

export async function findAllLocations(): Promise<LocationType[]> {
  return findLocations({});
}

export async function findLocationsById(
  location_ids: string[]
): Promise<LocationType[]> {
  return findLocations({ location_id: location_ids });
}

export async function onUserWishlist(
  user_id: string
): Promise<LocationType[]> {
  return findLocations({ on_wishlist: { $in: [user_id] } });
}

export async function updateWishlist(
  location_id: string,
  user_id: string,
  action: "add" | "remove"
): Promise<LocationType | null> {
  const filter = { location_id };
  const options: QueryOptions = { upsert: true, returnDocument: "after" };
  const update =
    action === "add"
      ? { $push: { on_wishlist: user_id } }
      : { $pull: { on_wishlist: user_id } };
  try {
    return await Locations.findOneAndUpdate(filter, update, options);
  } catch {
    return null;
  }
}
