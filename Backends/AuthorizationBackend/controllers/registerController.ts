import User from "../model/User";
import bcrypt from "bcrypt";
import { Response, Request } from "express";
import Login from "../data/LoginData";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

async function handleNewUser(req: Request<{}, {}, Login>, res: Response) {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(403)
      .json({ message: "Username and password are required." });

  if (!USER_REGEX.test(username)) {
    return res
      .status(403)
      .json({ message: "Username does not meet requirements." });
  }

  if (!PWD_REGEX.test(password)) {
    return res
      .status(403)
      .json({ message: "Password does not meet requirements." });
  }

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) {
    console.log("Duplicate found. Could not create");
    return res.sendStatus(409); //Conflict
  }

  //encrypt the password
  const hashedpassword = await bcrypt.hash(password, 10);

  //create and store the new user
  const result = await User.create({
    username: username,
    password: hashedpassword,
  });
  res.status(201).json({ success: `New user ${username} created!` });
}

export default handleNewUser;
