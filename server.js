const express=require("express");
const bodyParser=require("body-parser");

const app=express();
let w=[];
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.render("index.ejs",{listItems:w});
})

app.post('/server',(req,res)=>{
    
    w.push(req.body.input);
    res.redirect('/');
})


app.listen(3000);