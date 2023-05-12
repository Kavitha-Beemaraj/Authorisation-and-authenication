const express = require('express')
const app = express()
const bcrypt= require('bcrypt')
/*const mongoose= require('mongoose')

mongoose.set('strictQuery', true);
const dbUrl= "mongodb://127.0.0.1:27017/users?readPreference=primary&directConnection=true&ssl=false"
const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(dbUrl, connectionParams).then(() => console.info("connected to db"))*/


const users=[]

app.use(express.json())
app.get('/users',(req,res)=>{
    res.json(users)
})

app.post('/users',async (req,res)=>{
    try{
        const hashedPassword= await bcrypt.hash(req.body.password, 10)
        const user= { name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    }catch{
        res.status(500).send()

    }
    
})

app.post('/users/login',async (req,res)=>{
    const user = users.find(user=> user.name= req.body.name)
    if(user==null){
        return res.status(400).send('cannot find user')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('success')
        } else{
            res.send('not allowed')

        }
    }catch{
        res.status(500).send()

    }
})

app.listen(3000)