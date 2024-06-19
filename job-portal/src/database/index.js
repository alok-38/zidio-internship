const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const username = "plantsfortrees";
    const password = "Adapter123";
    const clusterName = "Cluster0";
    const dbName = "job-portal-nextjs"; // Replace with your actual database name

    const connectionURL = `mongodb+srv://${username}:${password}@${clusterName}.0a14aqk.mongodb.net/${dbName}`;

    await mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDB;
