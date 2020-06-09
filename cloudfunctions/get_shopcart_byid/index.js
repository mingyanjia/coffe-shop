// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'shopping-qjbx6'
})
var db = cloud.database()
var _=db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try{
       return await db.collection('shopcart').where({
         _id:_.in(event.ids)
       }).get()
  }catch(err){
    console.log('err',err)
  }
}