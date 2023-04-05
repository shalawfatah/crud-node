const express = require('express');
const notesRouter = require('./routes/notes');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db/connect')
const Stripe = require("stripe");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// STRIPE 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// STRIPE ROUTES
app.get('/config', (req, res) => {
    res.send({
       publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
})

app.post("/pay", async (req, res) => {
  const data = req.body;
  try {    
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "cad",
      amount: 1999,
      automatic_payment_methods: {
        enabled: true
      },
    })
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment initiated", clientSecret, data });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message
      }
    })
  }
});

// ROUTES
app.use('/api/notes', notesRouter);

app.listen(5001, () => {
    console.log('Server started on port 5001');
});