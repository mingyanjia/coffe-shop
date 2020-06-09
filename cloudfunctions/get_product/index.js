// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'shopping-qjbx6'
})

//获取数据库引用
var db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {

try{
  return await db.collection('product').where({
    [event.key]: event.value
  }).get()
  
}catch(err){
  console.log('err==>',err)
}
}
  