const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(books)
    },3000)})
    let myBooks = await myPromise;
  return res.status(300).json(myBooks);
    
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(books[req.params.isbn])
    },3000)})

  return myPromise.then((myBooks) => {
    res.status(300).json(myBooks);})
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        let book = {};
  for (const [key, value] of Object.entries(books)) {
    if(value.author === req.params.author){
        book[key] = {
             ...books[key]
        };
    }
  }
      resolve(book)
    },3000)})

  return myPromise.then((myBooks) => {
    res.status(300).json(myBooks);})
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
       let book = {};
  for (const [key, value] of Object.entries(books)) {
      let j = key;
    if(value.title === req.params.title){
        book[key] = {
             ...books[key]
        };
    }
  } 
      resolve(book)
    },3000)})

  return myPromise.then((myBooks) => {
    res.status(300).json(myBooks);})
  
});
  

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json(books[req.params.isbn]["reviews"]);
});

module.exports.general = public_users;
