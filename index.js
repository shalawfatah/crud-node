const express = require('express');
const notesRouter = require('./routes/notes');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db/connect')

const app = express();
app.use(cors());
app.use(bodyParser.json());

// STRIPE 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-01-01"
})

// STRIPE ROUTES
app.get('/config', (req, res) => {
    res.send({
       publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
})

app.post("/pay", async (req, res) => {
    try {
      const { final, price, email, id, name, finalDuration } = req.body;
      if (!final) return res.status(400).json({ message: "Price must be valid" });
      const paymentIntent = await stripe.paymentIntents.create({
        amount:final,
        currency: "CAD",
        payment_method_types: ["card"],
        metadata: { final, price, email, id, name, finalDuration },
      });
      const clientSecret = paymentIntent.client_secret;
      res.json({ message: "Payment initiated", clientSecret });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

// ROUTES
app.use('/api/notes', notesRouter);

app.listen(5001, () => {
    console.log('Server started on port 5001');
});