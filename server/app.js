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



// apis 
app.use("/api/v1/users", userRoute)
app.use("/api/v1/budget", budgetRoute)
app.use('/api/v1/transactions', transactionRoutes)
app.use('/api/v1/reports', reportRoutes);


export {app}