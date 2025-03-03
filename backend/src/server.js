import express from 'express'
import cors from 'cors'
import notesRoutes from './routes/notesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL

app.use(cors({
    origin: FRONTEND_URL, 
    credentials: true, 
    methods: 'GET,POST,PUT,DELETE', 
  }));

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/notes', authMiddleware, notesRoutes)

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);})