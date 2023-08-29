const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const UserModel = require('./models/UserModel');
const PostModel = require('./models/PostModel');
const connectToDatabase = require("./db"); // Import the database connection function
connectToDatabase().catch(err => {
    console.error("Error connecting to database:", err);
    process.exit(1);
});
const app = express();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());

// Connect to MongoDB Atlas



const verifyUser = (req, res, next) => {
    const token = req.cookies.token; // Use req.cookies to access parsed cookies
    if (!token) {
        return res.json('The token is Missing');
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.json("the token is wrong");
            } else {
                req.email = decoded.email;
                req.username = decoded.username;
                next();
            }
        });
    }
};


app.get('/', verifyUser, (req, res) => {
   return res.json({email:req.email,username:req.username})
});


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
            res.json("Marked as completed");
        })
        .catch(err => res.json(err));
});
app.delete('/deletepost/:postId', (req, res) => {
    const postId = req.params.postId;

    PostModel.findByIdAndDelete(postId)
        .then(() => {
            res.json("Post deleted");
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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
    const response = await bcrypt.compare(password, user.password);
    if (response) {
    const token = jwt.sign(
    { email: user.email, username: user.username },
    "jwt-secret-key",
    { expiresIn: '1d' }
    );
    res.cookie('token', token, { path: '/', httpOnly: true, expires: new Date(Date.now() + 86400000) });
    return res.json("Success");
    } else {
    return res.json('Password is incorrect');
    }
    } else {
    return res.json('User not found');
    }
    });

app.post('/create', (req,res)=>{
    PostModel.create({title:req.body.title,description:req.body.description})
    .then(result=>res.json("Success"))
    .catch(err=>res.json(err))
})

// ... (other imports and setup code)

app.put('/updatepost/:postId', (req, res) => {
    const postId = req.params.postId;
    const updatedPost = req.body;

    PostModel.findByIdAndUpdate(postId, updatedPost)
        .then(() => {
            res.json({ message: "Post updated successfully" });
        })
        .catch(err => res.json(err));
});

// ... (other routes and app.listen)


app.listen(3001,()=>{
    console.log("server is running")
})
