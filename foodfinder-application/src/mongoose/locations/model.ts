import mongoose from "mongoose";
import { LocationSchema, LocationType } from "./schema";

export default mongoose.models.locations ||
  mongoose.model<LocationType>("locations", LocationSchema);
