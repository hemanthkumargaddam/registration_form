const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { addListener } = require("nodemon");

const app = express ();
dotenv.config();

const port = process.env.PORT || 5500;

const username= process.env.MONGODB_USERNAE;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.86anp1o.mongodb.net/registrationFormDB`,{
    userNewUrlParser : true,
    userUnifiedTopology : true,
});

const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});



const Registeration= mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get  ("/",(req, res) =>{
    res.sendFile(__dirname + "/pages/formm.html");
})
  
app.post("/register",async (req,res)=>{
    try{
        const{name,email,password} = req.body;

        const existingUser = await Registration.findOne({email :email});
        if(!existingUser){
            const registerationData=new Registration({
                name,
                email,
                password
            });
            await registerationData.save();
            res.redirect("/success");

        }
        else{ 
            alert("user already exist");
            res.redirent("/error");
        }
    }
    catch(eror){
        console.log(error);
        res.redirect("error");
    }
})

app.get ("/success",(req, res)=>{
    res.sendFile (__dirname+"/pages/success.html");
})
app.get("/error",(req,res)=>{
    res.sendFile (__dirname+"/pages/error.html");
})


app.listen(port,()=>{
    console.log(`server runnnig on port ${port}`);
})

  