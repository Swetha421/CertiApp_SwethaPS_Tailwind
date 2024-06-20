const express=require('express');
const app=express();

const path=require('path');

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}));

const issuecerti=[];

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','certificate.html'))
})
app.get('/issuecertificate',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','issuecertificate.html'))
})
app.get('/issued',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','issued.html'))
})

app.get("/certificate/:id",(req,res)=>{
    const id=req.params.id;
    const certi=issuecerti.find((certificat)=>certificat.CertiID ==id)
    if(!certi){
        return res.status(404).send("certificate not found")
    }
    res.sendFile(path.join(__dirname,'public','issued.html'))
})

app.get("/api/certificate/:id",(req,res)=>{
    const id=req.params.id;
    const certi=issuecerti.find((certificat)=>certificat.CertiID == id)
    if(!certi){
        return res.status(404).json({error:'certificate not found'})
    }
    res.json(certi)
})

app.post("/certificate",(req,res)=>{
    const {Course,CertiID,name,grade,date}=req.body;
    console.log(req.body)
    const newCertificate = { Course, CertiID, name, grade, date };
    issuecerti.push(newCertificate);

    res.status(201).send("Certificate issued successfully");
});


app.listen(3010,()=>{
    console.log("the server is running")
})