const express = require("express")
const router = express.Router()
const handleLogin = require("../controllers/loginController")
const handleRefreshToken = require("../controllers/refreshTokenController");
const handleLogout = require("../controllers/logoutController");

router.post("/login", handleLogin);

router.get("/logout", handleLogout);

router.get("/refresh", handleRefreshToken);

module.exports = router;