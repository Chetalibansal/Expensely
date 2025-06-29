import Router from "express"
import {createBudget, getAllUsers, getBudgetAlerts, getBudgets} from "../controllers/budget.controller.js"
import auth from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/authorizeRole.middleware.js"

const router = Router()

router.route("/").post(auth,createBudget)
router.route("/").get(auth,getBudgets)
router.route("/:id").get(auth, getBudgetAlerts)
router.route("/admin/users").get(auth, authorizeRoles("admin"), getAllUsers)

export default router

