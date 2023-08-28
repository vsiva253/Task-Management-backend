const express =require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt =require("bcrypt")
const jwt=require('jsonwebtoken')
const cookieParser=require ("cookie-parser")
const multer=require("multer")
const path=require("path")
const UserModel=require('./models/UserModel')
const PostModel=require('./models/PostModel')

const app=express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/task-management');

const verifyUser=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token) {
        return res.json('The token is Missing')
    } else {
        jwt.verify(token,'jwt-secret-key',(err,decoded)=>{
            if(err) {
                return res.json("the token is wrong")
            } else {
                req.email=decoded.email;
                req.username=decoded.username;
                next()
            }
        })
    }
}

app.get('/',verifyUser,(req,res)=>{
    return res.json({email:req.email,username:req.username})
})

app.get('/getposts',(req,res)=>{
    PostModel.find()
    .then(posts=>res.json(posts))
    .catch(err=>res.json(err))
})

app.get('/getpostbyid', (req,res)=>{
    const id=req.params.id
    PostModel.findById({_id:id})
    .then(post=>res.json(post))
    .catch(err=>console.log(err))
})

app.put('/markascompleted/:postId', (req, res) => {
    const postId = req.params.postId;

    PostModel.findByIdAndUpdate(postId, { isCompleted: true })
        .then(() => {
            // After marking as completed, delete the post
            return PostModel.findByIdAndDelete(postId);
        })
        .then(() => {
            res.json("Marked as completed and post deleted");
        })
        .catch(err => res.json(err));
});



app.post('/register',(req,res)=>{
    const{username,email,password}=req.body;
    bcrypt.hash(password, 10)
    .then(hash=>{UserModel.create({username,email,password:hash})
        .then(user=>res.json(user))
        .catch(err=>res.json(err))
    }).catch(err=>console.log(err))
   
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign(
                            { email: user.email, username: user.username },
                            "jwt-secret-key",
                            { expiresIn: '1d' }
                        );
                        res.cookie('token', token, { path: '/', httpOnly: true });
                        return res.json("Success");
                    } else {
                        return res.json('Password is incorrect');
                    }
                });
            } else {
                res.json('User not found');
            }
        });
});


app.post('/create', (req,res)=>{
    PostModel.create({title:req.body.title,description:req.body.description})
    .then(result=>res.json("Success"))
    .catch(err=>res.json(err))
})

app.listen(3001,()=>{
    console.log("server is running")
})