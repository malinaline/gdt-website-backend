var express = require('express');
var router = express.Router();
const fs = require("fs");
const cors = require("cors");
const { parse } = require('path');

router.use(cors());

let apiNyckel = "123456";

/* GET users listing. */
router.get('/', function(req, res, next) {

  //skicka json-filen till usersroutern, börjar med felhantering, om ej fel: skriv ut innehåll till webbläsaren.
  //behöver parsa för att kunna göra det

  fs.readFile("users.json", function(err, data) {
    if(err) {
      console.log(err);

      if(err.code == "ENOENT")
      {
        console.log("Finns ingen sådan fil! ");
      }

    }

    let users = JSON.parse(data);

    res.json(users);
return;
  });

});

router.get('/:userName', function(req, res, next) {

  console.log("Skicka info om ", req.params.userName);

  fs.readFile("users.json", function(err, data) {
    if(err) {
      console.log(err);
    }

    let users = JSON.parse(data);

    let sendUser = users.find((users) => users.firstName == req.params.userName);

    console.log("Hittad user", sendUser);

    res.json(sendUser);

  });

});

router.post("/new/:apiNyckel", function(req, res){

  let getKey = req.params.apiNyckel;

  if (getKey == apiNyckel) {

    let newUser = req.body;
  console.log(newUser);

  fs.readFile("users.json", function(err, data) {
    if (err) {
      console.log(err);
    }

    let users = JSON.parse(data);
    users.push(newUser);

    fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err) {
      if (err) {
        console.log(err);
      }
    })

  })


  res.json("Ny användare sparad");

  } else {
    res.json("Nehe du! Så får du inte göra!");
  }

  

});


router.post('/add', function(req, res, next){


  fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err) {
    if (err) {
      console.log(err);

}

const users = JSON.parse(data)

let newUser = {}; //här ska stå nåt annat?

users.push(newUser);

fs.writeFile("users.json", JSON.stringify(users, null, 2), function(err){
  if (err) {
    console.log(err);
  }
})

res.send(users)
return;
  });
});


module.exports = router;
