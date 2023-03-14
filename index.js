const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
      const user = db.collection("user")

// *************get data **************************************************
        app.get('/user', async(req , res)=>{
        
          const result = await user.find({}).toArray()
          res.send(result)
        })


      
// ************** post data -************************************
            app.post('/userPost', async(req , res)=>{
                const data = req.body;
                const result = await user.insertOne(data);
                res.send(result)
            })




      // user post in dt
     
    //   // update like and count
    //   app.put("/like/:id", async (req, res) => {
    //     const bodyemail = req.body;
    //     const email = bodyemail.email;
    //     const id = req.params.id;
    //     const getpostquery = { _id: ObjectId(id) };
  
    //     const getpost = await myposts.findOne(getpostquery);
    //     const { like } = getpost;
  
    //     for (const aa of like) {
    //       console.log(aa);
    //       if (aa === email) {
    //         console.log('object');
    //         return;
    //       }
            
    //     }
  
    //     const option = { upsert: true };
    //     const updaterev = {
    //       $set: {
    //         like: [...like ,email],
    //       },
    //     };
    //     const result = await myposts.updateOne(getpostquery, updaterev, option);
    //     res.send(result);
  
    //   });
  
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
