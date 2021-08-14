const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true });

//List of items
const itemSchema = {
    name: String
};

const Item = mongoose.model("item", itemSchema);

//Default Items

const it1 = new Item({ name: "Set your goals" });
const it2 = new Item({ name: "Hit on +, to add items" });
const it3 = new Item({ name: "< Hit this, to delete items" });

const defaultItems = [it1, it2, it3];

app.get("/", function (req, res) {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems,function(err){
                if(err){
                    console.log(err);
                }
            });
        }
        res.render('list', { day: day, newItems: foundItems });
        
    });


    let day = today.toLocaleDateString("en-US", options);


});

app.post("/", function (req, res) {
    //Get item from form
    let itName = req.body.newItem;
    const newIt = new Item({name:itName});
    newIt.save();
    
    res.redirect("/");
});

app.post("/delete", function (req, res) {
    //Deleting item
    let itemId = req.body.checkbox;
    Item.findOneAndDelete(itemId,function(err){
        if(err){
            console.log(err);
        }
    });
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Check out Port 3000!!");
});