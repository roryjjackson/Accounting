const express = require("express")
const router = express.Router();
const {Transaction, Account} = require("../models")

router.route("/")
.get(async(req, res)=>{
try {
  const transactions = await Transaction.findAll()
  return res.status(200).json({
    mesage: "transaction fetched",
    transactions
  })

} catch(err){
  throw new Error("server issues " +  err.message)
}
})
  .post( async(req,res)=>{
    try {
      const {amount, accountId} = req.body;
      const account = await Account.findByPk(accountId);
      if(!account){
        let balance = 0  + amount;
        let newAccount =   await  Account.create({account_id :accountId, balance});
        let newTransaction = await Transaction.create({
          account_id : newAccount.account_id,
          amount
        })
        return res.send({
        message: "transaction created",
        data: newTransaction
       });
      }else {
        let updatedBalance = account.balance + amount;
        await  account.update({balance: updatedBalance})
        let newTransaction = await Transaction.create({
          account_id : account.account_id,
          amount
         })
         return res.send({
          message: "transaction created",
          data: newTransaction
         });
      }
    } catch (err){
      console.log(err.message)
      throw new Error(
        "unable to process request"
      )
    }
  })

  router.route("/:id").get(async(req, res)=>{
    try {
      let transaction = await Transaction.findByPk(req.params.id)
      return res.status(200).json({
        message : "transaction fetched",
        transaction
      })
    }catch(err){
       throw new Error("server issues " + err.message)
    }
  })

module.exports =router
