const Datastore = require('nedb');

class  DAO  {

    constructor(dbFilePath)  {         //run database as a file
                
        if  (dbFilePath)  {            
            this.db  =  new  Datastore({  filename:  dbFilePath,  autoload:  true  });            
            console.log("\n>>>>> DB connected to file: ",  dbFilePath);        
        } 
        else  {             //in memory 
                         this.db  =  new  Datastore();         }    
    }


    all() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, entries) {
                if (err) {
                    reject(err);
                    console.log('rejected');
                } else {
                    resolve(entries);
                    console.log('resolved');
                }
            });
        })
    }

    insertUser(firstname, surname, username, password , course , uni ,id) {        
        this.db.insert({
            firstname: firstname,
            surname: surname, 
            username: username,
            password: password,
            course: course,
            uni: uni,
            module: [],
            _id : id
        })
    }

    insertModule(id, module) {
        this.db.update({ _id: id }, { $push: { module: module } }, {}, function() {});
    }

    findModule(module_id) {
        var y = module_id;
        return new Promise((resolve, reject) => {
            this.db.findOne({module :{$elemMatch : {"module_id": y} }}, function(err , entries) {
                
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    for(var x = 0 ; x <= entries.module.length - 1 ; x++){
                        
                        if(entries.module[x].module_id == module_id){
                            var data = {"module" : entries.module[x] , "uID" : entries._id}; 
                            resolve(data); 
                        }
                    }
                }
            });
    })

    }

    removeModule(id , module_id){
        var t = this.findModule(module_id) ; 
        t.then((x) => {
            this.db.update({ _id: id }, { $pull:  {module : x.module}  }, {}, function(err , numRemoved) {});})
    }

    completeModule(id , module_id){
        console.log(module_id + " 75");
        var t = this.searchByID(id);
        t.then((entries) => {
            for(var x = 0; x < entries.module.length; x++)
                if(entries.module[x].module_id == module_id && entries.module[x].courseworkCompleted == false ) {
                    this.removeModule(id, module_id);
                    var g = entries.module[x];

                    var date = new Date();
                    var formattedDate = ('0' + date.getDate()).slice(-2);
                    var formattedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
                    var formattedYear = date.getFullYear().toString();
                    var dateString = formattedDate + '/' + formattedMonth + '/' + formattedYear;
                    g.completionDate = dateString;
                    g.courseworkCompleted = true;
                    this.insertModule(id, g);
                }
        })
    }

    updateModule( module){
        var v = this.findModule(module.module_id);
        v.then((entries) => {
            var id = entries.uID;
            var g = entries.module ; 
            this.removeModule(id , module.module_id);
            var g = entries.module;
                    g.projectTitle= module.projectTitle ; 
                    g.moduleName = module.moduleName;
                    g.milestones = module.milestones;
                    g.dueDate = module.dueDate ;
                    g.courseworkCompleted = module.courseworkCompleted;
                    console.log(module.completionDate);
                    if(module.courseworkCompleted == false){
                        g.completionDate = "" ; 
                    }else{
                        g.completionDate = module.completionDate;
                    }

                    
                    this.insertModule(id, g);

        })
    }

    removeAllModules(id) {
        var t = this.searchByID(id);
        t.then((entries) => {
            for(var x = 0; x < entries.module.length; x++) {
                this.removeModule(id, entries.module[x].module_id);
            }
        })
    }

    removeUser(id) {
        this.db.remove({_id : id} , {} , function(err , numRemoved){console.log(numRemoved)});
    }

    searchByName(uname) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ username: uname }, function(err, entries) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(entries);
                }
            });
        })
    }
    
    searchByID(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: id }, function(err, entries) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(entries);
                }
            });
        })
    }

    completeMilestone(id , milestoneID , module_id){
        return new Promise((resolve, reject) => {
        var module = this.findModule(module_id);
        var done = false ; 
        module.then((module) => {
            var moduleR = module.module ; 
            for(var x  = 0 ; x < moduleR.milestones.length ; x++){
                if(moduleR.milestones[x].milestone_id  ==  milestoneID){
                    done = true ; 
                var milestone = moduleR.milestones[x];
                console.log(milestone.milestoneCompleted + "168");
                if(milestone.milestoneCompleted == true){
                    milestone.milestoneCompleted = false;
                    moduleR.milestones[x] = milestone ;
                    this.updateModule(moduleR);
                    resolve(moduleR.milestones[x].milestoneCompleted);
                }else{
                    milestone.milestoneCompleted = true;
                    moduleR.milestones[x] = milestone ;
                    this.updateModule(moduleR);
                    resolve(moduleR.milestones[x].milestoneCompleted);
                }
                }

            }
            if(done == false){
                reject("err");
            }
        })
    }) 
    }

}

module.exports  =  DAO;