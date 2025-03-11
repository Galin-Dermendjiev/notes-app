import express from 'express'
import cors from 'cors'
import notesRoutes from './routes/notesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = [
  "http://localhost:5173",
  "http://frontend:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
}));
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/notes', authMiddleware, notesRoutes)

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);})