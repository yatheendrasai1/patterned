/*!
 * Module dependencies.
 */
const _ = require('lodash');
const usermodel = require("../models/user");
const notifier = require('node-notifier');
const scheduler = require("../../config/scheduler");

function homepage(req, res){
  res.render('home/index', {
    title: 'Patterned.'
  });
}

function notes(req, res){
  res.render('home/notes', {
    title: 'Patterned.'
  });
}

function register(req, res){
  res.render('home/registerScreen',{
    title: "Patterned."
  });
}

function registerUser(req, res){
  var userName = req.body.userName;
  var userID =  Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
  var userAura = userName+"-"+userID;
  var userDetails = {
    username: userName,
    aura: userAura
  }
  return usermodel.create(userDetails).then(function(userInfo){
    res.render("home/afterRegistration",{
      title: "Welcome to Patterned.",
      username: userInfo.username,
      auraNumber: userInfo.aura
    })
  });
}

function login(req, res){
  res.render("home/loginScreen",{
    title: "Login Screen"
  });
}

function loginUser(req, res){
  var auraNumber = req.body.aura;
  return usermodel.findOne({aura:auraNumber}).then(function(userInfo){
    console.log("sss:::: ", userInfo);
    if(!_.isEmpty(userInfo)){
      res.render("home/baseScreen",{
        title: "Base Screen",
        username: userInfo.username
      });
    }
    else{
      res.render('home/registerScreen',{
        title: "Patterned."
      });
    }
  })
}

async function loadNotification(req, res){
  await scheduler.userNotification({});
  res.render('home/baseScreen',{
    title: "Patterned.",
    username: "Sai"
  });
}

function getUsers(req, res){
  return usermodel.find({}).then(function(users){
    return res.send(users);
  })
}

module.exports = {
  homepage: homepage,
  notes: notes,
  registerUser: registerUser,
  register: register,
  getUsers: getUsers,
  login: login,
  loginUser: loginUser,
  loadNotification: loadNotification
};
