const cors = require("cors");
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middlewares here
app.use(express.json());
app.use(cors());

// Routes here
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Listen
app.listen(5000, () => {
  console.log("Server started at port 5000");
});

app.post("/api/create-checkout-session", async (req, res) => {
  const { token, amount, description, name } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount,
      description,
      name,
      currency: "usd",
      source: token.id,
    });
    res.json(charge);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        "An error occurred while processing your payment. Please try again."
      );
  }
});
