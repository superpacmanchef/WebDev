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

    insertUser(firstname, surname, username, passowrd , course , uni ,id) {        
        this.db.insert({
            firstname: firstname,
            surname: surname, 
            username: username,
            passowrd: passowrd,
            course: course,
            uni: uni,
            module: [],
            _id : id
        })
    }

    updateModule(id, module) {
        this.db.update({ _id: id }, { $push: { module: module } }, {}, function() {});
    }

    findModule( id , module_id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({"_id": id }, function(err , entries) {
                
             
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    for(var x = 0 ; x <= entries.module.length - 1 ; x++){
                        
                        if(entries.module[x].module_id == module_id){ 
                            resolve(entries.module[x]); 
                        }
                    }
                }
            });
    })

    }

    removeModule(id , module_id){
        var t = this.findModule(id , module_id) ; 
        t.then((x) => {
            this.db.update({ _id: id }, { $pull:  {module : x}  }, {}, function(err , numRemoved) {});})
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

}

module.exports  =  DAO;