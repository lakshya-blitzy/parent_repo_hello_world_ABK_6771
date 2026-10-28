const express=require("express"),app=express();
app.get("/",(req,res)=>res.type("text/plain").send("Hello, World!\n"));
app.get("/good-evening",(req,res)=>res.type("text/plain").send("Good evening\n"));
app.listen(3000);
