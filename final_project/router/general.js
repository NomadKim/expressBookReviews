const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// 10
async function getBooks(){
    return await axios.get("https://olehkim2-5000.theiadocker-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/")
   }
// 11
function getBookByISBN(isbn){
    axios.get("https://olehkim2-5000.theiadocker-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/" + isbn).
    then((response)=>{
        console.log(response.data);
    });
}
// 12
async function getBookByAuthor(author){
    return await axios.get("https://olehkim2-5000.theiadocker-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/" + author);
}
// 13
function getBookByTitle(title){
    axios.get("https://olehkim2-5000.theiadocker-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/" + title).
    then((res)=>{
        console.log(res.data);
    });
}
   

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
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let book = {};
  for (const [key, value] of Object.entries(books)) {
    if(value.author === req.params.author){
        book[key] = {
             ...books[key]
        };
    }
  }
  return res.status(300).json(book);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let book = {};
  for (const [key, value] of Object.entries(books)) {
    if(value.title === req.params.title){
        book[key] = {
             ...books[key]
        };
    }
  }
  return res.status(300).json(book);
});
  

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json(books[req.params.isbn]["reviews"]);
});

module.exports.general = public_users;
