const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');
const userModel = require('./models/user');
const postModel = require('./models/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const upload=require("./config/multerconfig");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/profile/upload',(req,res)=>{
    res.render("profilepic");
});

app.post("/upload",islogged,upload.single("image"),async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
    user.profilestring=req.file.filename;
    await user.save()
    res.redirect("/profile");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect("/login");
});

app.get('/profile', islogged, async (req, res) => {
    try {
        // Fetch all posts from the database and populate the user field
        let allPosts = await postModel.find().populate("user");
        let currentUser = await userModel.findOne({ email: req.user.email });
        res.render('profile', { user: currentUser, posts: allPosts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong while loading the profile.");
    }
});


app.get('/like/:id', islogged, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id }).populate("user");
    if(post.likes.indexOf(req.user.userid)===-1){
        post.likes.push(req.user.userid);
    }  
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1)
    }
    await post.save();
    res.redirect('/profile');
});

app.get('/edit/:id', islogged, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id }).populate("user");
    res.render("edit",{post});
});

app.post('/update/:id', islogged, async (req, res) => {
    let post = await postModel.findOneAndUpdate({_id: req.params.id },{content:req.body.content,title:req.body.title})
    res.redirect("/profile");
});
app.post('/addPost', islogged, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let { content , title } = req.body;
    let post = await postModel.create({
        user: user._id,
        content,
        title
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});

app.post('/register', async (req, res) => {
    let { email, username, password, age } = req.body;
    let existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists.");

    let hashedPassword = await bcrypt.hash(password, 10);
    let user = await userModel.create({
        username,
        email,
        age,
        password: hashedPassword
    });

    let token = jwt.sign({ email: email, userid: user._id }, "shh");
    res.cookie("token", token);
    res.redirect("/profile");
});

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password.");

    let isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send("Invalid email or password.");

    let token = jwt.sign({ email: email, userid: user._id }, "shh");
    res.cookie("token", token);
    res.redirect("/profile");
});

function islogged(req, res, next) {
    if (!req.cookies || !req.cookies.token) {
        return res.status(401).send("You must log in first");
    }
    try {
        let data = jwt.verify(req.cookies.token, "shh");
        req.user = data;
        next();
    } catch (err) {
        return res.status(401).send("Invalid or expired token.");
    }
}


app.listen(7000, () => {
    console.log("Server is running on http://localhost:7000");
});
