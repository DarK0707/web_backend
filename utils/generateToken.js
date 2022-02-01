// Generate token
import jwt from "jsonwebtoken";

// user id in token
const generateToken = (id) => {
  return jwt.sign({ id }, "jwtketsklaşdasd", { expiresIn: "30d" });
};

export default generateToken;
