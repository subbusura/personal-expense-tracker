// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
import Users from "./../../../models/users";
import dbMiddleware from "./../../../middleware/dbMiddleware";
export default nc()
  .use(dbMiddleware)
  .post(async (req, res) => {
    let { body } = req;
    //TODO Store data in  Database
    res.statusCode = 200;

    try {
      let user = await Users.findOne({ email: body.email });
      if (user) {
        res.statusCode = 422;
        return res.json({
          email: "email id already exist!"
        });
      } else {
        const NewUser = new Users({
          auth_type: 1,
          name: body.name,
          email: body.email,
          password: body.password
        });
        const success = await NewUser.save();

        if (success) {
          res.json({});
        }
      }
    } catch (error) {
      res.statusCode = 422;
      console.log("LOG", error);
      res.json({});
    }
  });
