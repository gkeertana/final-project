import Head from "next/head";
import type { GetStaticProps, NextPage, InferGetStaticPropsType } from "next";
import LocationsList from "@/components/locations-list";
import dbConnect from "@/middleware/db-connect";
import { findAllLocations } from "@/mongoose/locations/services";
import { LocationType } from "@/mongoose/locations/schema";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  const locations: LocationType[] = JSON.parse(data.locations);
  return (
    <>
      <Head>
        <title>The Food Finder – Home</title>
        <meta name="description" content="The Food Finder – Home" />
      </Head>
      <h1>Welcome to the Food Finder!</h1>
      

      <LocationsList locations={locations} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    await dbConnect();
    const locations = await findAllLocations();
    return { props: { data: { locations: JSON.stringify(locations) } } };
  } catch {
    return { notFound: true };
  }
};

export default Home;
