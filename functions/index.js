const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")("sk_test_..."); // Your Stripe secret key
admin.initializeApp();

exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  try {
    const { plan, uid } = req.body;
    
    const priceMap = {
      pro: "price_XXX",    // Replace with your real Stripe Price IDs
      elite: "price_YYY"
    };

    if (!priceMap[plan]) {
      return res.status(400).send("Invalid plan selected");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceMap[plan], quantity: 1 }],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      metadata: { uid, plan },
    });

    res.json({ sessionId: session.id });

  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).send("Internal server error");
  }
});
