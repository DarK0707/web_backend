import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "jwtketsklaşdasd", { expiresIn: "30d" });
};

export default generateToken;
