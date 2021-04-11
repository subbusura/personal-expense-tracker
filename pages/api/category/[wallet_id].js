import nc from "next-connect";
import dbMiddleware from "./../../../middleware/dbMiddleware";
import authMiddleware from "./../../../middleware/authMiddleware";
import Category from "./../../../models/Category";

export default nc()
  .use(dbMiddleware)
  .use(authMiddleware)
  .get(async (req, res) => {
    //TODO Get All Category by wallet id
    let { body, user, query } = req;
    let list = await Category.find({ wallet_id: query.wallet_id });

    res.statusCode = 200;
    res.json(list);
  })
  .put(async (req, res) => {
    let { body } = req;
    //TODO Update Category by wallet id

    res.statusCode = 200;
    res.json({});
  })
  .delete(async (req, res) => {
    //TODO Delete Category by wallet id

    res.statusCode = 200;
    res.json({});
  });
