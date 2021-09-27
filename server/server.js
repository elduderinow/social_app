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
    picture: String,
    created_on: Date,
    edited_on: Date
}

const isFriendSchema = {
    email: String,
    friends: [],
    pending_req: [],
    pending_res: []
}


const Persons = mongoose.model("Persons", friendsSchema);
const Friends = mongoose.model("Friends", isFriendSchema);


app.post('/addFriendCollection', (req, res) => {

    let newFriend = new Friends({
        email: req.body.email,
        friends: req.body.friends,
        pending_req: req.body.pending_req,
        pending_res: req.body.pending_res,
    })

    newFriend.save().then(r => console.log(r));

})

app.post('/addPerson', (req, res) => {
    console.log(req.body)
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
        created_on: req.body.created_on,
        edited_on: req.body.edited_on

    })
    newPerson.save().then(r => console.log(r));

})

app.get('/allPersons', (req, res) => {
    Persons.find((e, person) => {
        res.send(person);
    });
})

app.get('/allFriends', (req, res) => {
    Friends.find((e, friends) => {
        res.send(friends);
    });
})

app.get('/FriendColl/:email', (req, res) => {
    Friends.find({email: req.params.email}, function (err, friendCol) {
        res.send(friendCol)
    });
})

app.delete('/delete/:id', function (req, res, next) {
    Persons.findByIdAndDelete({_id: req.params.id}).then(function (friend) {
        res.send(friend);
    })
})

app.delete('/deleteFriend/:email', function (req, res) {
    req.params.email = ""
    Friends.deleteMany({email: req.params.email}).then(function (friend) {
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
        friend.edited_on = req.body.edited_on
        friend.created_on = req.body.created_on
        friend.save().then(r => console.log(r));
    });
})

app.put('/allFriends', (req, res) => {

    let user1 = {email: req.body.req_email, date: req.body.requested_on, fname: "", lname: ""}
    let user2 = {email: req.body.res_email, date: req.body.requested_on, fname: "", lname: ""}


    Persons.find({$or: [{email: user1.email}, {email: user2.email}]}, function (err, persons) {
        //  console.log(persons)
        persons.forEach((person) => {
            if (person.email === user1.email) {
                user1.fname = person.fname
                user1.lname = person.lname
            }
            if (person.email === user2.email) {
                user2.fname = person.fname
                user2.lname = person.lname
            }
        })

        Friends.find({$or: [{email: user1.email}, {email: user2.email}]}, function (err, users) {
            if (err) {
                res.send(err)
            }

            users.forEach((user) => {
                //this is the requesting user
                if (user.email === user1.email) {
                    //user1 (the requesting) gets the user2 email in his/her response by pushing user2 to the pendingRes Obj.
                    //check for doubles
                    let reqArr = []
                    user.pending_res.forEach((res) => {
                        reqArr.push(res.email)
                    })

                    if (reqArr.includes(user2.email) !== true) {
                        user.pending_res.push(user2)
                        user.save().then(r => console.log(r));
                    }
                }
                //this is the receiving user
                if (user.email === user2.email) {
                    //check for doubles
                    let reqArr = []
                    user.pending_req.forEach((req) => {
                        reqArr.push(req.email)
                    })

                    if (reqArr.includes(user1.email) !== true) {
                        user.pending_req.push(user1)
                        user.save().then(r => console.log(r));
                    }
                }
            })

        })
    })

})

app.put('/allFriends/edit', (req, res) => {
    Friends.find({$or: [{email: req.body.thisUser}, {email: req.body.friendUser}]}, function (err, users) {
        users.forEach((user) => {
            if (user.email === req.body.thisUser) {
                user.friends.push(req.body.friendUser)
                user.pending_req = user.pending_req.filter(function (value) {
                    return value.email !== req.body.friendUser
                });
                user.save().then(r => console.log(r));

            }

            if (user.email === req.body.friendUser) {
                console.log(user)
                user.friends.push(req.body.thisUser)
                user.pending_res = user.pending_res.filter(function (value) {
                    return value.email !== req.body.thisUser
                });
                user.save().then(r => console.log(r));
            }
        })
    })
})

app.get('/allPersons/friends/:email', (req, res) => {

    Friends.findOne({email: req.params.email}, function (err, data) {
        Persons.find({email: {$in:data.friends}}).then(function (data){
          res.send(data)
        })
    })
})

app.listen(PORT, () => {

})

