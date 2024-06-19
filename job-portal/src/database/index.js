const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  try {
    const connectionURL = "mongodb+srv://plantsfortrees:Adapter@123@cluster0.0a14aqk.mongodb.net/";

    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Job board database connection is successful");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export default connectToDB;