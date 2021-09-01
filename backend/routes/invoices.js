var express = require('express');
var router = express.Router();
var db = require('../database/database'); 

/* GET invoices listing. */
router.get('/', async function(req, res, next) {

  let invoices = await db.invoices.findAll();
  res.send(invoices);
});

router.post('/', async (req, res) => {
  let invoices = req.body.invoices
  try {
    invoices.forEach(async invoice => {
      await db.invoices.create({invoice_id:invoice[0], amount: invoice[1], due_date:new Date(invoice[2])});  
    });
  } catch (error) {
    console.log(error)
  }
  
})

module.exports = router;
