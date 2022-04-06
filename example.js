const protobuf = require("protobufjs");

run().catch((err) => console.log(err));

async function run() {
  const root = await protobuf.load("user.proto");

  const User = root.lookupType("userpackage.User");
  console.log(User.verify({ name: "test", age: 2 })); // null
  console.log(User.verify({ propertyDoesntExist: "test" })); // null
  console.log(User.verify({ age: "not a number" })); // "age: integer expected"
  const buf = User.encode({ name: "Bill", age: 30 }).finish();

  console.log(Buffer.isBuffer(buf)); // true
  // @ts-ignore
  console.log(buf.toString("utf8")); // Gnarly string that contains "Bill"
  // @ts-ignore
  console.log(buf.toString("hex")); // 0
  const asProtobuf = User.encode({ name: "Joe", age: 27 }).finish();
  const asJSON = JSON.stringify({ name: "Joe", age: 27 });

  console.log(asProtobuf.length); // 7
  console.log(asJSON.length); // 23, 3x bigger!
}
