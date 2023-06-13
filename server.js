const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/TO-DO-ListDB').then(function(){
    console.log("Connected");
})

const list_schema=mongoose.Schema({
    name:String,
    list_items:[String]
});

const to_do_list=mongoose.model('to_do_list',list_schema);


const app=express();


let title="Daily Tasks";
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/',(req,res)=>{
   
  let list_name = req.params.list_name;
      to_do_list.find({name:"daily"}).then(function(FoundItems){ 
      res.render("list.ejs",{listItems:FoundItems[0].list_items,title:"daily"});
    
      })
       .catch(function(err){
        console.log(err);
      })
   
})

app.post('/:list_name',(req,res)=>{

    let list_name = req.params.list_name;
     to_do_list.find({name:list_name}).then(function (FoundItems)
     {
        if(FoundItems.length==0)
        {
            let a=new to_do_list({
              name:list_name,
              list_items:[]
            })
            a.save().then(()=>{
              let path='/'+list_name;
              res.redirect(path);
            })
        }
        else{
          
        FoundItems[0].list_items.push(req.body.input);
       
        to_do_list.updateOne({name:list_name},{list_items:FoundItems[0].list_items}).then(()=>
        {
           let path="/"+list_name;
           res.redirect(path);
        })
      }
     })

})

app.get('/:list_name',(req,res)=>{

     let list_name = req.params.list_name;
    to_do_list.find({name:list_name}).then(function(FoundItems){
      if(FoundItems.length==0)
      {
          let a=new to_do_list({
            name:list_name,
            list_items:[]
          })
          a.save().then(()=>{
            let path='/'+list_name;
            res.redirect(path);
          })
      }
      else{
      res.render("list.ejs",{listItems:FoundItems[0].list_items,title:list_name});
      }
        
      })
       .catch(function(err){
        console.log(err);
      })
   
})


app.listen(3000);