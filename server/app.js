import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import transactionRoutes from './routes/transaction.route.js';
import reportRoutes from './routes/report.route.js';
import userRoute from "./routes/user.route.js"
import budgetRoute from "./routes/budget.route.js"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/transactions', transactionRoutes)
app.use('/api/reports', reportRoutes);


// apis 
app.use("/api/v1/users", userRoute)
app.use("/api/v1/budget", budgetRoute)


export {app}