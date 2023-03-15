const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://storeko:${process.env.MONGODB_PASSWORD}@storeko.h9wvmxw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

async function run() {
  try {
    const db = client.db("storekoall");
    const user = db.collection("user");
    const marqe = db.collection("marqe");
    const allPhoto = db.collection("allphoto");

    // *************get data **************************************************
    // user get
    app.get("/images", async (req, res) => {
      const useremail = req.query.email;
      const query = { email: useremail };
      const result = await allPhoto.find(query).toArray();
      res.send(result);
    });
    // user get
    app.get("/user", async (req, res) => {
      const useremail = req.query.email;
      const query = { email: useremail };
      const result = await user.findOne(query);
      res.send(result);
    });
    // slider data get
    app.get("/marqe", async (req, res) => {
      const result = await marqe.find({}).toArray();
      res.send(result);
    });

    // ************** post data -************************************
    app.post("/userPost", async (req, res) => {
      const data = req.body;
      const result = await user.insertOne(data);
      res.send(result);
    });
    // post image
    app.post("/postImage", async (req, res) => {
      const data = req.body;
      const result = await allPhoto.insertOne(data);
      res.send(result);
    });

    // *********************** delete ***************************
    app.delete("/imagede/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allPhoto.deleteOne(query);
      res.send(result);
    });

    // ******************** update data**********************
    // user post in dt

    //   // update name
    app.put("/username", async (req, res) => {
      const emailUser = req.query.email;
      const { name } = req.body;
      const query = { email: emailUser };
      const option = { upsert: true };
      const updaterev = {
        $set: {
          name: name,
        },
      };
      const result = await user.updateOne(query, updaterev, option);
      res.send(result);
    });
    //   // update img
    app.put("/userPut", async (req, res) => {
      const emailUser = req.query.email;
      const { img } = req.body;
      const query = { email: emailUser };
      const option = { upsert: true };
      const updaterev = {
        $set: {
          image: img,
        },
      };
      const result = await user.updateOne(query, updaterev, option);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("okkkk");
});

app.listen(port, () => {
  console.log("port :>> ", port);
});
