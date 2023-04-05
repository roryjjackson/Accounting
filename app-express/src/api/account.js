const express = require("express")
const router = express.Router();
const { Account} = require("../models")

router.route("/:id").get(async(req, res)=>{
  try {
    const account  = await Account.findByPk(req.params.id)
    return res.status(200).json({
      message:'account fetched',
      account
    })
  }catch (err){
    throw new Error("server issues " + err.message)
  }
})


module.exports = router
