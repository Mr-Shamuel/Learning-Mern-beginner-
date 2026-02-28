import express from "express"     
// const express =require('express');
import  notesRoutes from "./routes/noteRoutes.js"

const app =express();
app.use("/api/notes",notesRoutes)

// app.get('/api/notes',(req,res)=>{
//     res.status(200).send("you got 5 notes !!!")
// })
// app.post('/api/notes',(req,res)=>{
//     res.status(201).json({message:"note successfully created"});
// })

// app.put("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"Node updated Successfully"})
// })
// app.delete("/api/notes/:id",(req,res)=>{
//     res.send(200).json({message:"Note delete successfully"})
// })

app.listen(5001,()=>{
    console.log("connected to the post 5001")
})
