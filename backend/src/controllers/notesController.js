export const getAllNotes =(req,res)=>{
    res.status(200).send("you got 5 notes !!!")
}

export const createNotes =(req,res)=>{
    res.status(201).json({message:"Node successfully create"})
}

export const updateNotes =(req,res)=>{
    res.status(200).send("you got 5 notes !!!")
}

export const deleteNotes =(req,res)=>{
    res.status(200).send("you got 5 notes !!!")
}