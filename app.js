const express=require("express");
const bodyParser=require("body-parser");

const app=express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

//List of items
let items=["Buy milk","Buy chocolates"];
app.get("/",function(req,res){
    let today=new Date();
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    let day=today.toLocaleDateString("en-US",options);
    res.render('list', {day:day,newItems:items});
    
});

app.post("/",function(req,res){
     //Get item from form
     let item=req.body.newItem;
     items.push(item);
     res.redirect("/");
});

app.listen(3000,function(){
    console.log("Check out Port 3000!!");
});