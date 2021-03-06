const express = require('express');
const controller = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10 ; 
let DAOUser = require('../Model/users.js');
var dbFileUser = 'User.nedb.db';
let daoUser = new DAOUser(dbFileUser);
let sessionData ;



//renders Login Page
controller.get("/", function(req, res) {

    sessionData = req.session ; 
    if(sessionData.username == undefined){
    res.render('login');
    }else{
        res.redirect('/home');
    }

    
});
    

//Renders Register Page
controller.get('/register', function(req, res) {
    res.render('register');
});

//Renders Home Page
controller.get('/home', function(req, res) {
    sessionData = req.session ;
    if(sessionData.username == null || sessionData.username == undefined){
        res.redirect('/');
    }else{
    var t = daoUser.searchByID(sessionData.username);
    t.then((entry) => {
        if (entry.username == null) {
        } else {
            res.render('home', { "uname": entry.username ,
                                  "course": entry.course
                               });
        }
    })    
}
});

controller.get('/view', function(req, res) {
    var q = req.query.view ;
    var m = daoUser.findModule(q);
    m.then((module) => {
        if(module == "null"){
            res.render('wrongID');
        }else{
        res.render('view' , module.module);
        }
    });
});

controller.post('/register', function(req, res) {
    const fname = req.body.fname;
    const sname = req.body.sname;
    const uname = req.body.uname;
    const pword = req.body.psw;
    const pwordR = req.body.pswR;
    const course = req.body.course;
    const uni = req.body.unis;  

    bcrypt.genSalt(saltRounds , function(err , salt){
        if(pword == pwordR){
            bcrypt.hash(pword , saltRounds , (err , hash) => {
                daoUser.insertUser(fname , sname , uname , hash , course ,uni , salt) ; 
            })
            }else {
                
            }
    });
    res.end();

});

controller.post('/regCheck', function(req, res) {
    const uname = req.body.uname;
    var t = daoUser.searchByName(uname);
     t.then((data) => { 
        console.log(data);
    if(data == "" || data == null){
            res.send("true");
        }else{
            res.send("false");
        }
        res.end();
     });

});

controller.post('/add', function(req, res) {
    sessionData = req.session ;
    console.log("ss");
    bcrypt.genSalt(saltRounds , function(err , salt){ 
    var projectTitle = req.body.projectTitle;
    var moduleName = req.body.mName;
    var dueDate = req.body.dueDate;
    var milestones = req.body.milestones;
    
    var module = {"module_id" : salt, "projectTitle" : projectTitle, "moduleName" : moduleName, "dueDate" : dueDate, "completionDate" : "", "courseworkCompleted" : false , "milestones" : milestones}; //T0DO - NO DUPES
    daoUser.insertModule(sessionData.username , module);
    res.end();
    });
});

controller.post('/', function(req, res) {
    const uname = req.body.uname;
    const pword = req.body.psw;
    var t = daoUser.searchByName(uname);
    t.then((entry) => {
            if (entry == null) {
                console.log("none there");
            } else {
                bcrypt.compare(pword , entry.password , function(err,result){
                    if(result){
                        req.session.username = entry._id ;
                        res.redirect('/home');
                    }else {
                        res.render('/');
                    }
                })
            }
        })
        .catch((err) => {
        
            res.end();
        });


});








controller.post('/getModules' , function(req,res){
    sessionData = req.session 
    var data = daoUser.searchByID(sessionData.username);
    data.then((data) => {
        res.send(data);
    })
})

controller.post('/getModule' , function(req,res){
    var id = req.body.id ; 
    var data = daoUser.findModule(id);
    data.then((data ) => {
        res.send(data);
    }).catch();
})

controller.post('/del', function(req, res) {
    sessionData = req.session 
    const module_id = req.body.id;
    daoUser.removeModule(sessionData.username, module_id) ;
    res.redirect('/home') ; 

});

controller.post('/completeCW', function(req, res) {
    sessionData = req.session 
    const module_id = req.body.id;
    daoUser.completeModule(sessionData.username , module_id) ;
    res.redirect('/home') ; 

});

controller.post('/sort', function(req, res) {
    var projectTitleA = new Array();
    var moduleArray = new Array();
    sessionData = req.session ;
    var data = daoUser.searchByID(sessionData.username);
    
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
    sessionData = req.session ;
    var data = daoUser.searchByID(sessionData.username);

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
    sessionData = req.session ;
    var data = daoUser.searchByID(sessionData.username);

    data.then((data) => {
        
        for(var x = 0; x < data.module.length; x++) {
            var pushingProject = data.module[x].dueDate;
            EarliestDueDateA.push(pushingProject);
        }

        console.log(EarliestDueDateA);
        EarliestDueDateA.sort(); 
        console.log(EarliestDueDateA + "261");

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

controller.post('/sortLDueDate', function(req, res){
    var LatestDueDateA = new Array();
    var moduleArray = new Array();
    sessionData = req.session ;
    var data = daoUser.searchByID(sessionData.username);

    data.then((data) => {

        for(var x = 0; x < data.module.length; x++) {
            var pushingProject = data.module[x].dueDate;
            LatestDueDateA.push(pushingProject);
        }

        console.log(LatestDueDateA);
        LatestDueDateA.sort();
        console.log(LatestDueDateA + "292");
        LatestDueDateA.reverse();

        for(var y = 0; y < data.module.length; y++){
            for(var i = 0; i < data.module.length; i++) {
                if(data.module[y].dueDate == LatestDueDateA[i]) {
                    moduleArray[i] = data.module[y]
                }
            }
        }

        data.module = moduleArray;
        res.send(data);

    })
})

controller.post('/log', function(req, res) {
    req.session.destroy(function(err) {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
})

controller.post('/delAll', function(req,res) {
    sessionData = req.session;
    daoUser.removeAllModules(sessionData.username);
    res.end();
});

controller.post('/delCompleted', function (req , res ){
    sessionData = req.session ;
    var t = daoUser.removeCompletedModules(sessionData.username);
    t.then((data) => {
        res.send(data);
    });
});

controller.post('/updateModule' , function(req,res){
    var module_id = req.body.module_id;
    var projectTitle = req.body.projectTitle;
    var moduleName = req.body.mName;
    var dueDate = req.body.dueDate;
    var milestones = req.body.milestones;
    var courseworkCompleted = req.body.courseworkCompleted;
    if(courseworkCompleted == true) {
        var date = new Date();
        var formattedDate = ('0' + date.getDate()).slice(-2);
        var formattedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
        var formattedYear = date.getFullYear().toString();
        var dateString = formattedDate + '/' + formattedMonth + '/' + formattedYear;
        var completionDate = dateString;
    }

    var module = {"module_id" : module_id, "projectTitle" : projectTitle, "moduleName" : moduleName, "dueDate" : dueDate,  "milestones" : milestones , "courseworkCompleted" : courseworkCompleted , "completionDate" : completionDate}; //T0DO - NO DUPES
    daoUser.updateModule(module) ; 
    res.end();
});

controller.post('/completeMilestone' , function(req , res){
    var module_id = req.body.module_id ;
    var milestone_id = req.body.milestone_id; 
    var id = sessionData ; 
    var t = daoUser.completeMilestone(id.username , milestone_id , module_id) ;
    t.then((mod) => {
        
           res.send(mod);
        
    })
    
})




module.exports = controller;
