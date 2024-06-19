const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  const connectionURL = "mongodb+srv://plantsfortrees:Adapter@123@cluster0.0a14aqk.mongodb.net/";

  mongoose
    .connect(connectionURL)
    .then(() => console.log("job board database connection is successfull"))
    .catch((error) => console.log(error));
};

export default connectToDB;
