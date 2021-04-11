import nc from "next-connect";
import dbMiddleware from "./../../../../middleware/dbMiddleware";
import authMiddleware from "./../../../../middleware/authMiddleware";
import Transaction from "./../../../../models/Transaction";
export default nc()
  .use(dbMiddleware)
  .use(authMiddleware)
  .get(async (req, res) => {
    //TODO Get Transaction
    let { body, query, user } = req;

    let list = await Transaction.find({ wallet_id: query.wallet_id }).sort({
      created_at: -1
    });
    res.statusCode = 200;
    res.json(list);
  })
  .post(async (req, res) => {
    let { body, query, user } = req;
    //TODO Add Transaction
    let mTrans = new Transaction(body);
    mTrans.wallet_id = query.wallet_id;
    mTrans.created_by = user.user_id;
    mTrans.created_at = new Date();
    mTrans = await mTrans.save();

    res.statusCode = 200;
    res.json(mTrans);
  })
  .put(async (req, res) => {
    let { body } = req;
    //TODO Update Transaction

    res.statusCode = 200;
    res.json({});
  })
  .delete(async (req, res) => {
    //TODO Delete Transaction

    res.statusCode = 200;
    res.json({});
  });
