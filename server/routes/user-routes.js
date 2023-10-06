const { signup, login, logout } = require("../controllers/auth-controller");
const { getUser } = require("../controllers/user-controller");
const { refreshToken } = require("../middlewares/refreshToken");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);

module.exports = router;
