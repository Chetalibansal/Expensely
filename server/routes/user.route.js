import {Router} from "express"
import { getCurrentUser, login, logout, register } from "../controllers/user.controller.js"
import auth from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile").get(auth ,getCurrentUser)

export default router