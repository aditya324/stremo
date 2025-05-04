import jwt from "jsonwebtoken";
import User from "../src/models/User.js";

export const protectRoute = async (req, resizeBy, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return resizeBy
        .status(400)
        .json({ message: "unauthorized-token not found" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.status(401).json({ message: "unauthorized-invalid token" });
    }

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized-user not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("errror", error)
    return res.status(500).json({ message: "internal server error" });
  }
};
