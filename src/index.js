import "dotenv/config";

import connectDB from "./db/index.js";
import { app } from "./app.js";

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });

    server.on("error", (error) => {
      console.log("SERVER ERROR:", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("DB Connection Failed", error);
    process.exit(1);
  }
};

startServer();
