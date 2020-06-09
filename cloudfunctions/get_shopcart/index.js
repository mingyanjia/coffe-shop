// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'shopping-qjbx6'
})
var db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('shopcart').where({
      id:event.id,
      rules:event.rules,
      userInfo:event.userInfo
    }).get()
  }catch(err){
    console.log('err',err)
  }
}