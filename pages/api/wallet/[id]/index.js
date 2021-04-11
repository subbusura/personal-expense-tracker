import nc from "next-connect";
import dbMiddleware from "./../../../../middleware/dbMiddleware";
import authMiddleware from "./../../../../middleware/authMiddleware";
import Wallet from "./../../../../models/Wallets";
import Category from "./../../../../models/Category";

export default nc()
  .use(dbMiddleware)
  .use(authMiddleware)
  .get(async (req, res) => {
    //TODO Get Wallet

    res.statusCode = 200;
    res.json({});
  })
  .put(async (req, res) => {
    let { body } = req;
    //TODO Update Wallet
    res.statusCode = 200;
    res.json({});
  })
  .delete(async (req, res) => {
    //TODO Delete Wallet
    let { body, user, query } = req;

    await Wallet.findOneAndDelete({ owner_id: user.user_id, _id: query.id });
    await Category.deleteMany({ wallet_id: query.id });

    res.statusCode = 200;
    res.json(query);
  });
