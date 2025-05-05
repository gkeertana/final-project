import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/middleware/db-connect";
import { findAllLocations } from "@/mongoose/locations/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // easy debugging: log that we hit the route
  console.log("test-middleware handler running");

  // connect to MongoDB
  await dbConnect();

  // fetch all locations
  const locations = await findAllLocations();

  // log what we got back
  console.log("found locations:", locations.length);

  // return JSON
  res.status(200).json(locations);
}
