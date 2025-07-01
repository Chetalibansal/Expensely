import Router from "express"
import {createBudget, getAllUsers, getBudgetAlerts, getBudgetChartData, getBudgets} from "../controllers/budget.controller.js"
import auth from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/authorizeRole.middleware.js"

const router = Router()

router.route("/").post(auth,createBudget)
router.route("/").get(auth,getBudgets)
router.route("/alerts").get(auth, getBudgetAlerts)
router.route("/admin").get(auth, authorizeRoles("admin"), getAllUsers)
router.route("/chart-data").get(auth, getBudgetChartData)

export default router

