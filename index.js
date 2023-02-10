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
  try {
    const { product } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        },
      ],
      mode: "payment",
      success_url:
        "https://lighthearted-starlight-22c325.netlify.app/members/#card",
      cancel_url: "https://lighthearted-starlight-22c325.netlify.app",
    });
    // res.json({ id: session.id });
    res.json({ message: "payment successful" });
  } catch (error) {
    res.status(500).json({ message: "payment failed" });
  }
});
