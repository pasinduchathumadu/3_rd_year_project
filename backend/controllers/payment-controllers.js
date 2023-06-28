

export const confirmation = async(req,res,next)=>{

  
const stripe = require('stripe')('sk_test_51NGJbtSDLfwYkCbGClKeLdVOVqsrqMtkLNgctacUlwiMuLmebz1wX8yGwFuCjzfrqVfIp93tUMMmSEDrljnhYaSD00sWDNzrkL');






  try {
    // Get the payment token and amount from the request body
    const { token, amount } = req.body;

    // Create a charge using the Stripe API
    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'USD',
      description: 'Payment description',
      source: token,
    });

    // Payment successful
    res.json({ message: 'Payment successful', charge });
  } catch (error) {
    // Payment failed
    res.status(500).json({ error: 'Payment failed', message: error.message });
  }
}




