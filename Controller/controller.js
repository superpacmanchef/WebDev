const express = require('express');
const controller = express.Router();

let DAOUser = require('../Model/users.js');
var dbFileUser = 'User.nedb.db';
let daoUser = new DAOUser(dbFileUser);

var sessionData;


//renders Login Page
controller.get("/", function(req, res) {
    res.render('login');
});

//Renders Register Page
controller.get('/register', function(req, res) {
    res.render('register');
});

//Renders Home Page
controller.get('/home', function(req, res) {
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

controller.post('/add', function(req, res) {
    findabetterway = Math.floor(Math.random() * 101) ;  
    var dueDate = req.body.dueDate;
    var moduleName = req.body.mName;
    var projectTitle = req.body.projectTitle ; 
    var milestones = req.body.milestones ; 
    module = {"module_id" : findabetterway, "projectTitle" : projectTitle, "moduleName" : moduleName, "dueDate" : dueDate, "courseworkCompleted": false, "milestones" : milestones}; //T0DO - NO DUPES
    daoUser.updateModule(sessionData , module);
    res.end();
})
/////////////////

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
        
            res.end();
        });


});








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

controller.post('/sortD', function(req, res) {
    var projectTitleA = new Array();
    var moduleArray = new Array();

    var data = daoUser.searchByID(sessionData);

    data.then((data) => {
        
        for(var x = 0; x < data.module.length; x++) {
            var pushingProject = data.module[x].projectTitle;
            projectTitleA.push(pushingProject.toLowerCase());
        }

        projectTitleA.sort();
        projectTitleA.reverse();

        for(var y=0; y < data.module.length ; y++) {
            for(var i = 0; i < data.module.length; i++) {
                if(data.module[y].projectTitle.toLowerCase() == projectTitleA[i]) {
                    moduleArray[i] = data.module[y]
                }
            }
        }

        data.module = moduleArray;
        res.send(data);
    })
})

controller.post('/sortEDueDate', function(req, res){
    var EarliestDueDateA = new Array();
    var moduleArray = new Array();

    var data = daoUser.searchByID(sessionData);

    data.then((data) => {
        
        for(var x = 0; x < data.module.length; x++) {
            var pushingProject = data.module[x].dueDate;
            EarliestDueDateA.push(pushingProject);
        }

        console.log(EarliestDueDateA);
        EarliestDueDateA.sort(); 
        console.log(EarliestDueDateA);

        for(var y = 0; y < data.module.length; y++){
            for(var i = 0; i < data.module.length; i++) {
                if(data.module[y].dueDate == EarliestDueDateA[i]) {
                    moduleArray[i] = data.module[y]
                }
            }
        }

        data.module = moduleArray;
        res.send(data);

    })
})

controller.post('/log', function(req, res) {
    sessionData = null ; 
    res.redirect('/');
})

module.exports = controller;
