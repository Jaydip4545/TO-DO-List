const express=require("express");
const bodyParser=require("body-parser");

const app=express();
let dailyTasks=[];
let workTasks=[];
let title="Daily Tasks";
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.render("list.ejs",{listItems:dailyTasks,title:title});
})

app.post('/daily',(req,res)=>{

    if(req.body.button=="Daily Tasks")
    {
         dailyTasks.push(req.body.input);
         res.redirect('/');
    }
    else
    {
        workTasks.push(req.body.input);
        res.redirect('/work');
    }
    
})

app.get('/work',(req,res)=>{
    title="Work Tasks";
    res.render("list.ejs",{listItems:workTasks,title:title});
})


app.listen(3000);