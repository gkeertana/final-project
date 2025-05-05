import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/locations/resolvers";
import dbConnect from "@/middleware/db-connect";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({ /* will inject JWT later */ }),
});

const allowCors = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Allow", "POST");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.status(200).end();
  return fn(req, res);
};

const connectDB = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  return fn(req, res);
};

export default connectDB(allowCors(handler));
