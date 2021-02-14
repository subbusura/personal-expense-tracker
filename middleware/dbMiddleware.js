import dbConnect from "./../utils/dbConnect";

export default async function dbhMiddleware(req, res, next) {
  try {
    await dbConnect();
  } catch (error) {
    console.log("DB Exception", error.message);
    res.write(error.message);
    return res.end();
  }

  next();
}
