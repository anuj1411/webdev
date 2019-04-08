var express = require("express");
var app =express();
var mongoose=require("mongoose");
var passport=require("passport");
var bodyParser=require("body-parser");
var User=require("./models/user");
var LocalStrategy=require("passport-local");
var passportLocalStrategy=require("passport-local-mongoose");

mongoose.connect("mongodb://localhost")

app.use(require("express-session")({
    secret: "bang",
    resave:false,
    saveUninitialized:false
}));

app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
    res.render("index");
});

app.get("/loggedin",isLoggedIn,function(req,res){
    res.render("new.ejs");
});

app.get("/categories",function(req,res){
    res.render("categories");
});

app.get("/index",function(req,res){
    res.render("index");
});

app.get("/product",function(req,res){
    res.render("product");
});

app.get("/cart",function(req,res){
    res.render("cart");
});

app.get("/checkout",function(req,res){
    res.render("checkout");

    
});

app.get("/categories",function(req,res){
    res.render("categories");
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/smartphone",function(req,res){
    res.render("smartphone");
});

app.get("/laptop",function(req,res){
    res.render("laptop");
});

app.get("/dslr",function(req,res){
    res.render("dslr");
});

app.get("/audio",function(req,res){
    res.render("audio");
});

app.get("/accesories",function(req,res){
    res.render("accesories");
});


//AUTH ROUTES

app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}),req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/loggedin");
        });
        
    });
    
});

//LOGIN ROUTES

app.get("/login", function(req,res){
    res.render("login");
});

//login logic
app.post("/login",passport.authenticate("local", {
    successRedirect: "/loggedin",
    failureRedirect: "/login"
}) ,function(req,res){
});

//logout

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



app.listen(process.env.PORT,process.env.IP,function(){
    console.log("started");
})