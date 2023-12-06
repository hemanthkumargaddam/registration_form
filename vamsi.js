const express =require("express")

const vamsi=express()

const port = 3000


vamsi.get('/siva',(req,res)=>{
    res.send("GADDAM HEMATH KUMAR")
})

vamsi.listen(port,()=>{
    console.log ("jagadeesh , kumar")
})