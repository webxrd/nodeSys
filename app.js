const path = require('path');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const jwt = require(path.join(__dirname,'tools/jwt'));
let api = require(path.join(__dirname,'api/api.js'));
var permissions = ["个人所有银行卡","银行卡设置","我的商户","我是商户","所有商户","审批商户","添加商户","商户管理","我是供码用户","所有供码用户","添加供码用户","供码用户管理","我是代理","所有代理","添加代理","代理管理","用户信息","用户中心","日志明细","停用通道","修改通道","添加通道","运营管理","系统设置","风控管理","所有个人银行卡","公司添加银行卡","公司所有银行卡","银行卡管理","所有权限查询","某个职位权限查询","分配权限","权限管理","所有岗位","岗位添加","岗位管理","所有管理员","添加管理员","管理员管理","添加团队","所有团队","团队管理","公告管理","公司管理","个人添加银行卡","个人银行卡","提现历史","财务管理","抢单","处理订单","提现历史","添加内卡账变","报表统计","收款码报表","商户报表","供码用户报表","资金报表","代理报表","订单管理","订单明细","内部码帐变订单","内部卡帐变订单","公告管理"]

// 设置响应头
app.all('*',function (request,result,next) {
    console.log('request.headers');
    console.log(request.headers);
    console.log('request.url');
    console.log(request.url);
    console.log('request.body');
    console.log(request.body);
    result.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000,http://localhost:8090,http://127.0.0.1:4000");//允许访问本服务器的地址
    result.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");//允许访问本服务器的请求头
    result.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//允许访问本服务器的请求方法
    result.header("X-Powered-By",' 3.2.1');//x - power - by是HTTP响应头之一。X表示标头是扩展标头，即，不符合HTTP标准d。power - by:告诉HTTP客户机请求/响应是由哪个引擎处理的。
    result.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 遍历添加接口
for (let i in api){
    for (let j in api[i]){
        var temp = api[i][j];
        app[i](temp.path,temp.fun)
    }
}
app.post('/login',function (req,res) {
    console.log('login_____req.body');
    console.log(req.body);
    var token = jwt.encrypt({username:'abc'},'120');
    res.json({code:200,data:{permissions:permissions,role:1,token:token,uid:1}});
});
// 设置http://127.0.0.1:5000的默认页面
app.use(express.static(path.join(__dirname,'index.html')));
// 设置404页面
app.use('*',function (request,result) {
    result.sendFile(path.join(__dirname,'err','404.html'))
});
// 监听app服务开启。只执行一次
app.listen(5000,function (err) {
    if (err){
        console.log('连接5000失败！');
        throw err
    }
    console.log('连接成功！http://127.0.0.1:5000')
});