const express=require('express');
const schoolRouter = require('./routes/schoolRouter');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(schoolRouter);



app.get('/',(req,res)=>{

  res.send(`<P>Welcome to School Management System</P><br>
    <a href="/add-school">Click here to add </a>`);
})

app.listen(3000,()=>{
  console.log('The server is running on port http://localhost:3000');
})