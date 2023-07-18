const cors = require("cors");
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;

const stripe = require("stripe")(
  "sk_test_51Lcq7BLXHvCk9rLhWD8GgCOiyyKah7AULcQZISk7GuaSbW27DpP4JlQx7DGi1xpKOPAMvmp3poTIdOXswh6PIUTn0091tMJuqJ"
);

const app = express();

// Middlewares here
// Middlewares here
app.use(express.json());
app.use(cors());

// Routes here
app.get("/", (req, res) => {
  res.send("Marathi Association Perth");
});

// Listen
app.listen(5000, () => {
  console.log("Server started at port 5000");
});

app.post("/charge", async (req, res) => {
  const { token, amount } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount,
      currency: "aud",
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
