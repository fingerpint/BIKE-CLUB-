var mongodb = require('./db');
function  Bike(image) {
    this.image = image.image;
    this.title = image.title;
    this.description=image.description;
}
module.exports = Bike;
Bike.findAll = function (callback) {
    mongodb.open(function (err, db) {
        if (err) return callback(err);
        db.collection('image',function (err, collection) {
            if (err) {mongodb.close(); return callback(err);}
            collection.find({}).toArray(function (err,result) {
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result );
            })
        })
    })
};
Bike.findPage=function (skip,callback) {
    mongodb.open(function (err, db) {
        if (err) return callback(err);
        db.collection('image',function (err, collection) {
            if (err) {mongodb.close(); return callback(err);}
            collection.find().skip(parseInt(skip)).limit(3).toArray(function (err,result) {
                mongodb.close();
                if(err) return callback(err);
                return callback(null,result );
            })
        })
    })
};
