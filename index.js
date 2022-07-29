import express from "express";
import { dbconnect } from "./dbconnect.js";

const app = express();
app.use(express.json());

app.listen(3001, () => {
  console.log('listen on port 3001');
})

app.get('/', (req,res) => {
  //res.send('works');

  const db = dbconnect()
  db.collection('celebs')
    .get()
    .then((collection) => {
      //reshape collection to array
      const celeb = collection.docs.map((doc) => doc.data())
      //send array to response
      res.send(celeb)
    })
    .catch((err) => res.status(500).send(err)) //this is a very typical error catcher
})

app.post('/addCeleb', (req,res) => {
  const newCeleb = req.body;
  const db = dbconnect();
  db.collection('celebs').add(newCeleb)
  .then(res.send('success'))
})
