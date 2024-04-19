import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  jwt.verify(token, "xyz123", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.usuario = decoded;
    console.log(decoded);
    next();
  });
};
