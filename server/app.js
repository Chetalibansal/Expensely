import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import transactionRoutes from './routes/transaction.route.js';
import reportRoutes from './routes/report.route.js';



const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit: "16kb"})) 
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(cookieParser())
app.use('/api/transactions', transactionRoutes)
app.use('/api/reports', reportRoutes);

export {app}