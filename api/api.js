let CRUD = require("./mongo.js");
const api = {
    get:[
        {
            path:'/a',
            fun:function (req,res) {
                res.json({name:'5000的get数据'})
            }
        },
        {
            path:'/b',
            fun:function (req,res) {
                res.json({name:'5000的get数据'})
            }
        },
        {
            path:'/c',
            fun:function (req,res) {
                res.json({name:'5000的get数据'})
            }
        }
    ],
    post:[
        {
            path:'/a',
            fun:function (req,res) {
                res.json({data:[
                    {'name':'abc',age:'314'},
                    {'name':'qwe',age:'222'},
                    {'name':'afd',age:'333'}
                    ]})
            }
        },
        {
            path:'/insert',
            fun:function (req,res) {
                console.log('req.body');
                console.log(req.body);
                CRUD('insert',[req.body],function (data) {
                    console.log('insert__data');
                    console.log(data);
                    res.json(data)
                });

            }
        },
        {
            path:'/remove',
            fun:function (req,res) {
                CRUD('remove',[req.body],function (data) {
                    console.log('remove____data');
                    console.log(data);
                    res.json(data)
                });
            }
        },
        {
            path:'/update',
            fun:function (req,res) {
                CRUD('update',[req.body,{username:'abcdefg',password:'123456'}],function (data) {
                    console.log('update____data');
                    console.log(data);
                    res.json(data)
                });
            }
        },
        {
            path:'/find',
            fun:function (req,res) {
                CRUD('find',[req.body],function (data) {
                    console.log('find____data');
                    console.log(data);
                    res.json(data)
                });
            }
        }
    ],
};
module.exports = api;