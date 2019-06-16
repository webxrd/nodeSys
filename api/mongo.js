
// 增删改查方法包
const CRUD = {
    insert:function (condition,callback) {
        this.insert(condition[0],function (err,data) {
            console.log('进入insert方法');
            if (err){
                console.log('使用插入功能时——出错！');
                throw err;
            }
            // 有callback则执行，没有则执行默认的
            if (callback) {
                console.log('进入insert方法的——callback');
                callback(data)
            } else{
                console.log('插入'+data.result.n+'条数据成功！');
            }
        })
    },
    remove: function (condition,callback) {
        this.remove(condition[0],function (err,data) {
            if (err) {
                console.log('使用删除功能时——出错！');
                throw err;
            }
            if (callback) {
                callback(data)
            } else{
                console.log('删除数据成功！');
            }
        })
    },
    update:function (condition,callback) {
        this.update(condition[0],condition[1],function (err,data) {
            if (err) {
                console.log('使用修改功能时——出错！');
                throw err;
            }
            if (callback) {
                callback(data)
            } else{
                console.log('修改数据成功！');
            }
        })
    },
    find : function (condition,callback) {
        this.find(condition[0]).toArray(function (err,data) {
            if (err) {
                console.log('使用查询功能时——出错！');
                throw err;
            }
            // 有callback则执行，没有则执行默认的
            if (callback) {
                callback(data);
            } else{
                console.log('查询成功——'+JSON.stringify(condition));
            }
        })
    },
};
const MongoClient = require("mongodb").MongoClient;
const dbURL = 'mongodb://localhost:27017';

module.exports = function(type,condition,callback,collection){
    // type      决定执行增删改查中的哪个方法；——find,insert,update,remove
    // condition 执行方法所需要的查询条件。
    // callback  执行完方法后的回调函数
    // collection可选。执行集合名称，默认userInfo
    MongoClient.connect(dbURL,function(err,client){
        if(err){
            console.log('数据库连接失败！');
            throw err;
        }else{
            console.log('数据库连接成功！');
        }
        const db = client.db("userControl");// 用户管理，数据库
        console.log('打开数据库userControl');
        console.log(collection);
        console.log(db);
        // 使用传入的集合，或者默认的userInfo
        let col = collection ? db.collection(collection) : db.collection("userInfo");
        console.log('打开集合userInfo');
        //————这里写增删改查逻辑————
        CRUD[type].call(col,condition,callback);
        // 关闭数据库和客户端
        client.close();
    });
};


