import axios from "axios";
import protobuf from "protobufjs";

const root = await protobuf.load("user.proto");

const doc = { name: "Bill", age: 30 };
const User = root.lookupType("userpackage.User");
let data = await axios.get("http://localhost:3000/user").then((res) => res.data);

// "Before POST User { name: 'Bill', age: 30 }"
console.log("Before POST", User.decode(Buffer.from(data)));
const postBody = User.encode({ name: "Joe", age: 27 }).finish();
await axios.post("http://localhost:3000/user", postBody).then((res) => res.data);

data = await axios.get("http://localhost:3000/user").then((res) => res.data);
// "After POST User { name: 'Joe', age: 27 }"
console.log("After POST", User.decode(Buffer.from(data)));
