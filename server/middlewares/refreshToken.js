const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(400).json({ message: "Invalid token" });
    }
    res.clearCookie(String(user.id)); // CLEAR THE PREVIOUS TOKEN

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s",
    });

    res.cookie(String(user.id), token, {
      path: "/",
      httpOnly: true,
      expiresIn: new Date(Date.now() + 1000 * 35),
      sameSite: "lax",
    });

    req.id = user.id;
  });
  next();
};
