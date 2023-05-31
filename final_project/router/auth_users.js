const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
 if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: username
    }, 'access', { expiresIn: 60 * 600 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let reviews = books[req.params.isbn]["reviews"];
  console.log(req.user);
  for (const [key, value] of Object.entries(reviews)) {
  if(key === req.user["data"]){
      reviews[key] = req.body.review;
      return res.status(300).json(reviews);
  }
}

reviews[req.user["data"]] = req.body.review;
  return res.status(300).json(reviews);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    let reviews = books[req.params.isbn]["reviews"];
  for (const [key, value] of Object.entries(reviews)) {
  if(key === req.user["data"]){
      delete reviews[key] 
      return res.status(300).json("deleted" + reviews);
  }
}
  return res.status(300).json("No such user");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
