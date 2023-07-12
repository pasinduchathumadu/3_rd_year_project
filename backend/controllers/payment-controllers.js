import Stripe from 'stripe';
import { v4 as uuid } from 'uuid';

const stripe = new Stripe("sk_test_51NGJbtSDLfwYkCbGClKeLdVOVqsrqMtkLNgctacUlwiMuLmebz1wX8yGwFuCjzfrqVfIp93tUMMmSEDrljnhYaSD00sWDNzrkL");
const id = uuid();


export const card = async(req,res,next)=>{
  const {product,token} = req.body
  const idempontencykey = uuid()

  stripe.customers.create({
    email:token.email,
    source:token.id
  }).then(customer =>{
    stripe.charges.create({
      amount:product.price,
      currency:'usd',
      customer:customer.id,
      receipt_email:token.email,

    } ,{idempontencykey})

  }).then(result =>{ return res.json({message:"success"})}).catch(error=>{
    return res.json({message:"There is an error"})

  })

}
