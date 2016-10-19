/**
 * Created by Pixel-Daze on 2016/10/19.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');   //自增ID 模块
    autoIncrement.initialize(mongoose.connection);        //初始化
var heroScheMa=new Schema({
    heroName:String
});

heroScheMa.plugin(autoIncrement.plugin,{
    model:'heroes',
    field:'id',
    startAt:21,
    incrementBy:1
});

exports.hero=mongoose.model('heroes',heroScheMa);