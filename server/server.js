const express = require('express');
const app = express();
const mongoose = require('mongoose');
const password = require('./password.js');

let mongoDB_pass = password.passwords()

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

mongoose.connect(`mongodb+srv://yarrutdb:${mongoDB_pass}@cluster0.yhqgt.mongodb.net/SocialApp`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

const friendsSchema = {
    fname: String,
    lname: String,
    email: String,
    phone: String,
    language: String,
    chicken: String,
    biography: String,
    age: Number,
    picture: String
}

const isFriendSchema = {
    email:String,
    friends:[],
    pending:[]
}


const Persons = mongoose.model("Persons", friendsSchema);
const Friends = mongoose.model("Friends", isFriendSchema);


app.post('/addFriendCollection',(req,res)=>{

    let newFriend = new Friends({
        email: req.body.email,
        friends: req.body.friends,
        pending: req.body.pending,
    })
   console.log(newFriend)
    newFriend.save().then(r => console.log(r));
})

app.post('/addPerson', (req, res) => {
    let newPerson = new Persons({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        language: req.body.language,
        chicken: req.body.chicken,
        biography: req.body.biography,
        age: req.body.age,
        picture: req.body.picture,
    })
    newPerson.save().then(r => console.log(r));
})

app.get('/allPersons', (req, res) => {
    Persons.find((e, person) => {
        res.send(person);
        console.log(person)
    });
})

//app.get('/allFriends', (req, res) => {
//    console.log(req, res)
//    Friends.find((e, friends) => {
//        res.send(friends);
//    });
//})

app.delete('/delete/:id', function (req, res, next) {
    Persons.findByIdAndDelete({_id: req.params.id}).then(function (friend) {
        res.send(friend);
    })
})

app.put('/allPersons/:x', (req, res) => {
    Persons.findById(req.body._id).then(friend => {
            friend.fname = req.body.fname
            friend.lname = req.body.lname
            friend.email = req.body.email
            friend.phone = req.body.phone
            friend.language = req.body.language
            friend.chicken = req.body.chicken
            friend.biography = req.body.biography
            friend.age = req.body.age
            friend.picture = req.body.picture
            friend.save().then(r => console.log(r));
    });
})


app.listen(PORT, () => {

})

