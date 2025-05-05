import { updateWishlist } from "mongoose/locations/services";

interface UpdateArgs { location_id: string; user_id: string; }

export const locationMutations = {
  addWishlist: async (_: any, args: UpdateArgs) =>
    updateWishlist(args.location_id, args.user_id, "add"),
  removeWishlist: async (_: any, args: UpdateArgs) =>
    updateWishlist(args.location_id, args.user_id, "remove"),
};
