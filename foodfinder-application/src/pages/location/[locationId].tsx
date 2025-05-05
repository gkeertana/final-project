import Head from "next/head";
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { ParsedUrlQuery } from "querystring";
import dbConnect from "@/middleware/db-connect";
import { findLocationsById } from "@/mongoose/locations/services";
import { LocationType } from "@/mongoose/locations/schema";
import LocationDetail from "@/components/location-details";

interface Params extends ParsedUrlQuery {
  locationId: string;
}

const Location: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const location: LocationType = JSON.parse(data.location);
  return (
    <>
      <Head>
        <title>The Food Finder – Details for {location.name}</title>
        <meta name="description" content={`Details for ${location.name}`} />
      </Head>
      <h1>{location.name}</h1>
      <LocationDetail location={location} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  { data: { location: string } },
  Params
> = async (ctx) => {
  const { locationId } = ctx.params!;

  try {
    await dbConnect();
    const results = await findLocationsById([locationId]);
    if (!results.length) throw new Error("Not found");
    return {
      props: {
        data: { location: JSON.stringify(results[0]) },
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { notFound: true };
  }
};

export default Location;
