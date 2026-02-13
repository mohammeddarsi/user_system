import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No Token Provided" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

export const verifyRole = (role) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (userRole !== role) {
      return res.status(403).json({ message: "Forbidden User" });
    }
    next();
  };
};
