import { MongoClient, ObjectId } from "mongodb";

const credentials = process.env.REACT_APP_MONGODB_KEY;

// /api/new-meetup
// POST /api/new-meetup

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const id = req.body.toString();

    const client = await MongoClient.connect(`${credentials}`);
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.deleteOne({
      _id: ObjectId({ id }),
    });

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup deleted" });
  }
};

export default handler;
