import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const credentials = process.env.REACT_APP_MONGODB_KEY;

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a list of active react meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// Rerenders on every http request sent to the server | only use when you need access to req/res objects or data changes multiple times every second
// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

// Pre renders html from API then can rerender with revalidate every x seconds
export const getStaticProps = async () => {
  // fetch data from API
  const client = await MongoClient.connect(`${credentials}`);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
