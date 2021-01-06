var express = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");
var morgan = require("morgan");
const mongoose = require("mongoose");

let dbURI = "mongodb+srv://dbjahan:dbjahan@cluster0.8ric4.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function () {
    console.log('Mongoose is connected')
})
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose is disconnected")
})
mongoose.connection.on("error", function (err) {
    console.log("Mongoose connection error", err)
    process.exit(1)
})
process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log("Mangoose default connection closed")
        process.exit(0)
    })
})

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    gender: String,
    createdOn: { type: Date, 'default': Date.now }
});
var userModel = mongoose.model('users', userSchema);

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.post('/signup', (req, res, next) => {
    if (!req.body.name
        || !req.body.email
        || !req.body.password
        || !req.body.phone
        || !req.body.gender) {

        res.status(403).send(`
            please send name, email, passwod, phone and gender in json body.
            e.g:
            {
                "name": "Jahanzaib",
                "email": "jahanzaib@gmail.com",
                "password": "123",
                "phone": "242649826",
                "gender": "Male"
            }`)
        return;
    }

    userModel.findOne({email: req.body.email}, function(err,data){
        if (err) {
            console.log(err)        
        }
        else if(!data){
            var newUser = new userModel({
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password,
                "phone": req.body.phone,
                "gender": req.body.gender,
            })
            newUser.save((err, data) => {
                if (!err) {
                    res.send({
                        message : "User created",
                        status: 200
                    })
                } else {
                    console.log(err);
                    res.status(500).send("user create error, " + err)
                }
            });
        }
        else{
            res.send('Already registered')
            console.log(data)        
        }
    })
    
})
app.post('/login', (req, res,next) => {
    userModel.findOne({ email: req.body.lemail, password: req.body.lpassword }, function (err, data) {
        if (err) {
            console.log(err)
        }
        else if(!data) {
            res.send("user not found");
            console.log(data)
        }
        else{
            res.send("Login")
        }
    })

});  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})







