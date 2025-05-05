import {
    findAllLocations,
    findLocationsById,
    onUserWishlist,
  } from "mongoose/locations/services";
  
  export const locationQueries = {
    allLocations: async () => findAllLocations(),
    locationsById: async (_: any, { location_ids }: { location_ids: string[] }) =>
      findLocationsById(location_ids),
    onUserWishlist: async (_: any, { user_id }: { user_id: string }) =>
      onUserWishlist(user_id),
  };
  