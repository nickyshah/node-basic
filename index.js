// import EventEmitter  from 'events'
import express from 'express'
import path from 'path'
import fs from 'fs'
import { error } from 'console'

const app = express()


// console.log(app)
const PORT = 3000




app.listen(PORT, (error) => {
    error ? console.log(error) : console.log("your server is running at https://localhost:" + PORT)
})

const __dirname = path.resolve();
app.use(express.urlencoded())
// console.log(__dirname)

app.get("/registration", (req, res)=>{
    console.log("registration", req.query);
    res.sendFile(__dirname + "/register.html")
})

const fn = __dirname + "/userList.csv";

app.post("/registration", (req, res) => {
    const {email, password} = req.body;
    // console.log("/registration", req.body)
    
    const str = email + "|" + password + "\n"
    // console.log(str);
    // store in csv file
    fs.appendFile(fn, str, (error) => {
        error ? console.log(error) : console.log("data has been written in the file")
    } )

    res.send(`<h1>Thank You\, You have been registered</h1> <hr /> <a href="/">Home</a>`)
})

app.get("/login", (req, res)=>{
    res.sendFile(__dirname + "/login.html")
})

app.post("/login", (req, res)=>{
    // console.log("registration");
    const {email, password} = req.body

    const str = email + "|" + password + "\n"
    fs.readFile(fn, (error, data)=>{
        if(error){
            return res.send(error.message)
        } console.log(data.toString())
        const users = data.toString();
        users.includes(str) ? res.send(`Login Successful <a href="/">Home</a>`) : res.send("Invalid Login")
        // res.send("checking")
    })
    

    // res.send("Checking Login")
})


app.use("/", (req, res) => {
    // we do some server side code execution 
    res.send(`<a href="registration">Registration</a>
    <a href="login">Login</a> We received the data. <div><h1>Nicky Shah</h1><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam soluta praesentium corrupti consequuntur atque odit architecto eum suscipit quo accusantium.</p></div> `)
})



// console.log("hey there")

// const a = 5;
// const b = 6;

// const add = (i, j) => i + j

// console.log(add(a,b))


// const EventEmitter = require('events');


// const eventEmitter = new EventEmitter();
 

// This is called subscribbing
// eventEmitter.on("hehe", ()=>{
//     console.log("this is in inside hehe event")
// })
// eventEmitter.on("heh", ()=>{
//     console.log("this is in inside hehe event")
// })

// to run this code we have to trigger it
// trigger/emit

// eventEmitter.emit("hehe")

// handle network request 



