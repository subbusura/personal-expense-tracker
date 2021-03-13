import nc from "next-connect";
import dbMiddleware from "./../../../middleware/dbMiddleware";
import authMiddleware from "./../../../middleware/authMiddleware";
export default nc()
  .use(dbMiddleware)
  .use(authMiddleware)
  .get(async (req, res) => {
    //TODO Get All Wallet
    let { user, session } = req;

    res.statusCode = 200;
    res.json(user);
  })
  .post(async (req, res) => {
    let { body } = req;
    //TODO Add New Wallet

    res.statusCode = 200;
    res.json(body);
  });
