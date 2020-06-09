// 云函数入口文件
const cloud = require('wx-server-sdk')
// 云函数入口文件

cloud.init({
  env: 'shopping-qjbx6'
})
var db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // console.log('event',event)
  try {
    return await db.collection('rule').where({
    id: event.id
    }).get()
  } catch (err) {
    console.log('err', err)
  }
}