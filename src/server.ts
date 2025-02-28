import createApp from "./app";
import connectDb from "./database/database";

const app = createApp();
connectDb();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`🔥 Server running at port http://localhost:${port}`);
});
