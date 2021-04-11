import nc from "next-connect";
import dbMiddleware from "./../../../middleware/dbMiddleware";
import authMiddleware from "./../../../middleware/authMiddleware";
import Transaction from "./../../../models/Transaction";
export default nc()
  .use(dbMiddleware)
  .use(authMiddleware)
  .get(async (req, res) => {
    //TODO Get All Transaction by account id
    let { body, user, query } = req;

    if (query.wallet_id) {
      let transaction_list = await Transaction.find({
        wallet_id: query.wallet_id
      });
      res.statusCode = 200;
      res.json(transaction_list);
    } else {
      res.statusCode = 422;
      res.json({
        message: "Invalid Account id"
      });
    }
  })
  .post(async (req, res) => {
    let { body, user } = req;
    //TODO Add New Transaction by account id
    body.created_by = user.user_id;
    body.created_at = new Date();
    body.updated_at = null;
    let newTransaction = new Transaction(body);
    newTransaction = await newTransaction.save();
    res.statusCode = 201;
    res.json(newTransaction);
  });
