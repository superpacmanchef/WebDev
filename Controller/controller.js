const express = require('express');
const controller = express.Router();

let DAOUser = require('../Model/users.js');
var dbFileUser = 'User.nedb.db';
let daoUser = new DAOUser(dbFileUser);

var milestones = 0 ; 
var sessionData;
var no = 0;
var findabetterway ;
var module ;
var array = null ;



controller.get("/", function(req, res) {
    res.render('login');
});

controller.get('/register', function(req, res) {
    res.render('register');
});

controller.get('/home', function(req, res) {
    no = 0;
    milestone = 0 ;
    findabetterway = null;
  
        
    var t = daoUser.searchByID(sessionData);

    t.then((entry) => {
        if (entry.username == null) {

        } else {
            res.render('home', { "uname": entry.username ,
                                  "course": entry.course
                               });
        }
    })

    
});






//TODO : NO DUPES
controller.post('/register', function(req, res) {
    const fname = req.body.fname;
    const sname = req.body.sname;
    const uname = req.body.uname;
    const pword = req.body.psw;
    const pwordR = req.body.pswR;
    const course = req.body.course;
    const uni = req.body.unis;

    if (pword == pwordR) {
        daoUser.insertUser(fname, sname, uname, pword , course, uni);
        return res.redirect('/');
    }


    res.end();
});

controller.post('/', function(req, res) {
    const uname = req.body.uname;
    const pword = req.body.psw;
    var t = daoUser.searchByName(uname);

    t.then((entry) => {
            if (entry == null) {
                console.log("none there");
            } else {

                if (entry.passowrd == pword) {
                    sessionData = entry._id;
                    res.redirect('/home');
                } else {
                    console.log("Username or Password Wrong");
                    res.redirect('/');
                }
            }
        })
        .catch((err) => {
            console.log(err + "67");
            res.end();
        });


});

controller.post('/add', function(req, res) {
    findabetterway = Math.floor(Math.random() * 101) ;  
    var dueDate = req.body.dueDate;
    var moduleName = req.body.mName;
    var projectTitle = req.body.projectTitle ; 
    var milestones = req.body.milestones ; 
    module = {"moduleName" : moduleName , "dueDate" : dueDate , "milestones" : milestones,"projectTitle" : projectTitle , "module_id" : findabetterway}; //TEMP
    daoUser.updateModule(sessionData , module);
})







controller.post('/getModules' , function(req,res){
    var data = daoUser.searchByID(sessionData);
    data.then((data) => {
        res.send(data);
    })
})

controller.post('/del', function(req, res) {
    const module_id = req.body.id;
    daoUser.removeModule(sessionData , module_id) ;
    res.redirect('/home') ; 

});

controller.post('/sort', function(req, res) {
    var projectTitleA = new Array();
    var moduleArray = new Array();

    var data = daoUser.searchByID(sessionData);
    
    data.then((data) => {

        for(var x =0; x < data.module.length; x++) {
           var pushingProject = data.module[x].projectTitle
           projectTitleA.push(pushingProject.toLowerCase());
        }

        projectTitleA.sort();

     for(var y = 0 ; y < data.module.length ; y++){
        for(var i = 0 ; i < data.module.length; i++) {
            
            if(data.module[y].projectTitle.toLowerCase() == projectTitleA[i]) {
            moduleArray[i] = data.module[y];            
            }
        }
    }
        data.module = moduleArray ;
        res.send(data);

    })
    
    

});

controller.post('/log', function(req, res) {
    res.redirect('/');
})

module.exports = controller;
