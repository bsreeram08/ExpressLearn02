const express = require("express");
const router = express.Router();
const loginPage = require("../controllers/loginController");
// router.use(express.json());
router.get("/", loginPage.getLoginPage);
router.post("/", loginPage.performLogin);
module.exports = router;
