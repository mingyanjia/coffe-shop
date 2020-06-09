// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'shopping-qjbx6'
})
var db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('like').where(event).remove()

  }catch(err){
   console.log('err',err)
  }
}