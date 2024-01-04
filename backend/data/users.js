import bcrypt from "bcrypt";
const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Dag",
    email: "dag@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Lila",
    email: "lila@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
