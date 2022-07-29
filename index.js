import express from "express";
import { dbconnect } from "./dbconnect.js";

const app = express();
app.use(express.json());

app.listen(3001, () => {
  console.log('listen on port 3001');
})

app.get('/', (req,res) => {
  const db = dbconnect()
  db.collection('celebs')
    .get()
    .then((collection) => {
      const celeb = collection.docs.map((doc) => doc.data())
      res.send(celeb)
    })
    .catch((err) => res.status(500).send(err)) 
})

app.post('/addCeleb', (req,res) => {
  const newCeleb = req.body;
  const db = dbconnect();
  db.collection('celebs').add(newCeleb)
  .then(res.send('success'))
})
