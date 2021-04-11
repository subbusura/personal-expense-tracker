import nc from "next-connect";
import dbMiddleware from "./../../../middleware/dbMiddleware";
import authMiddleware from "./../../../middleware/authMiddleware";
import Currency from "../../../models/Currency";
export default nc()
  .use(dbMiddleware)
  .use(authMiddleware)
  .get(async (req, res) => {
    let list = await Currency.find();
    res.statusCode = 200;
    res.json(list);
  });
