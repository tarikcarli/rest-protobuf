import express from "express";
import protobuf from "protobufjs";

const app = express();

run().catch((err) => console.log(err));

async function run() {
  const root = await protobuf.load("user.proto");
  const User = root.lookupType("userpackage.User");
  
  const doc = { name: "Bill", age: 30 };

  app.get("/user", function (req, res) {
    res.send(User.encode(doc).finish());
  });

  app.post("/user", express.text({ type: "*/*" }), function (req, res) {
    // Assume `req.body` contains the protobuf as a utf8-encoded string
    console.log(Buffer.from(req.body).toString("base64"));
    console.log(req.body.length);
    const user = User.decode(Buffer.from(req.body));
    Object.assign(doc, user);
    res.end();
  });

  await app.listen(3000);
}
