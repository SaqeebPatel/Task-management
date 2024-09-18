const express = require("express");

const usercontroller = require("../Controller/usercontroller");
const auth = require("../middlware/auth");
const upload = require("../middlware/multer");

const router = express.Router();

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.get("/userinfo", auth, usercontroller.userinfo);
router.get('/getusers', usercontroller.getAllUsers);
router.put("/UPuser/:id",auth,upload, usercontroller.updateuser); // Route to update user by ID


module.exports = router;
