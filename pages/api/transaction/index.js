import nc from "next-connect";
import dbMiddleware from "./../../../middleware/dbMiddleware";
import authMiddleware from "./../../../middleware/authMiddleware";

export default nc()
  .use(dbMiddleware)
  .use(authMiddleware)
  .get(async (req, res) => {
    //TODO Get All Transaction by account id

    res.statusCode = 200;
    res.json({});
  })
  .post(async (req, res) => {
    let { body } = req;
    //TODO Add New Transaction by account id
    res.statusCode = 200;
    res.json({});
  });
