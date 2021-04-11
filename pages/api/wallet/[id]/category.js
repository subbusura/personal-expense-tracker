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
    let { query } = req;
    let category_list = await Category.find({ wallet_id: query.id });

    res.statusCode = 200;
    res.json(category_list);
  });
