var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');//自增字段插件
var Hero = require('../models/hero').hero;

var connection=mongoose.connect('mongodb://pixel:daze@45.127.97.95:27017/pixel-daze');

autoIncrement.initialize(connection);

var resp = {
    result: false,
    msg: '',
    data: null
};

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/gethero',function(req,res,next){

    Hero.find((err,doc)=>{
        if(err){
            console.log(err);
        }if(doc==null){
            resp.result = true;
            resp.data=null;
            resp.msg = "";
            res.json(resp);
        }else{
            resp.result = true;
            resp.data=doc;
            resp.msg = "查询成功";
            res.json(resp);
        }
    });
});

/*findById*/
router.get('/getheroById',function(req,res,next){
    var id = req.query.id;
    Hero.find({id:id},(err,doc)=>{
        if(err){
            console.log(err);
        }if(doc==null){
            resp.result = true;
            resp.data=null;
            resp.msg = "";
            res.json(resp);
        }else{
            resp.result = true;
            resp.data=doc[0];
            resp.msg = "查询成功";
            res.json(resp);
        }
    });
});

/* createhero */
router.post('/createhero',function(req,res,next){
    var hero = new Hero({
        heroName:req.body.name
    });
    hero.save();
    resp.result = true;
    resp.msg = "创建用户成功！";
    res.json(resp);
});

/*updatehero*/
router.put('/updatehero',function(req,res){
    var id=req.body.id;
    var heroName=req.body.heroName;
    Hero.update({'id':id},{'$set':{'heroName':heroName}},(err,doc)=>{
        if(err){
            console.log(err);
        }else{
            resp.result = true;
            resp.data=null;
            resp.msg = "更新成功";
            res.json(resp);
        }
    })
});

/*deletehero*/
router.delete('/deletehero',function(req,res){
    var id = req.query.id;
    Hero.remove({'id':id},(err,doc)=>{
        if(err){
            console.log(err);
        }else{
            resp.result = true;
            resp.data=null;
            resp.msg = "删除成功";
            res.json(resp);
        }
    })
});


module.exports = router;
