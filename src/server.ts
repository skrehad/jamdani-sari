import { Server } from "http";
import app from "./app";

const port = process.env.PORT || 5000;

let server: Server;
const main = async () => {
  server = app.listen(port, () => {
    console.log("Server is running on port :", port);
  });
};
main();
