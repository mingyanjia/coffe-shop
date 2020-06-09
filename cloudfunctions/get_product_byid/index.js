// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'shopping-qjbx6'
})

//获取数据库引用
var db = cloud.database();
//获取查询指令应用
var _ =db.command
// 云函数入口函数  event.ids 商品id集合
exports.main = async (event, context) => {
  try{
    return await db.collection('product').where({
      _id:_.in(event.ids)
    
    }).get()
  }catch(err){
      console.log('err',err)
  }
}