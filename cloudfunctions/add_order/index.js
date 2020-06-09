// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'shopping-qjbx6'
})
var db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var orderData=event.data;
  orderData.userInfo=event.userInfo
  try{
       return await db.collection('order').add({
         data:orderData
       })
  }catch(err){
    console.log('err',err)
  }
}