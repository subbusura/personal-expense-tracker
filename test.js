const mongoose = require("mongoose");
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://pemadmin:pemadminpassword@cluster0.l4gju.mongodb.net/pemdb?retryWrites=true&w=majority";
main();

async function main() {
  try {
    await dbConnect();
  } catch (error) {
    console.log("DB Exception", error.message);
  }

  console.log("Moboose Db Instanse", mongoose.connection.db);
}

async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
}
