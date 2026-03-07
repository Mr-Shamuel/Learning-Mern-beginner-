import express from "express"
import  notesRoutes from "./routes/noteRoutes.js"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors';
dotenv.config();

const app =express();
const PORT=process.env.PORT || 5001;


//middle ware 

app.use(cors({
    origin:'http://localhost:5173'
}))
app.use(express.json()); //this middleware will parse JSON bodies: req.body

app.use(rateLimiter);// used rate limit midddleware

//our simple custom middleware
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & req Url is ${req.url}`)
//     next();
// })

app.use("/api/notes",notesRoutes)


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connected to the post ",PORT)
    })
});

