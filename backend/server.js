import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
const app=express();
app.use(express.json())
app.use(cors())
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    port: '3306',
    password:'system',
    database:"reactdb"
})
app.get('/',(req,res)=>{
    const sql="select * from student";
     db.query(sql,(err,result)=>{
        if(err) return res.json({Message:"Error in server side"})
         return res.json(result)
    })
})
app.post('/add/',(req,res)=>{
    const sql="Insert into student(id,name,branch)values(?)";
    const values=[
        req.body.id,
        req.body.name,
        req.body.branch
    ]
    db.query(sql,[values],(err,result)=>{
        if(err) return res.json({Message:"Error in server side"})
            return res.json(result)
    })
})
app.put('/edit/:id',(req,res)=>{
    const sql='update student set name=?,branch=? where id=?';
    const id=req.params.id;
    const values=[req.body.name,req.body.branch]
    db.query(sql,[...values,id],(err,result)=>{
        if(err) return res.json(err)
            return res.json(result)
    } )
})
app.delete('/student/:id',(req,res)=>{
    const sql="Delete from student where id=?"
    const id=req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json(err)
            return res.json(result)
    })
})
app.listen(3000,()=>{
    console.log("Server is listening")
    
})




