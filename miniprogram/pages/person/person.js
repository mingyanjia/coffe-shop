// miniprogram/pages/person/person.js

var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        //用户信息
        userInfo:{
          url:'',
          nickName:'',
          sex:''
        }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       //如果授权获取用户信息
    if (app.globalData.isAuth){
        wx.getUserInfo({
          success:res=>{
            this.setData({
              userInfo:{
                url:res.userInfo.avatarUrl,
                nickName:res.userInfo.nickName,
                sex:res.userInfo.gender == 0 ? '未知' : res.userInfo.gender == 1 ? '男' : '女'
              }
            })
          }
        })
       }
  },
 //跳转地址
 addTurn(){
   wx.navigateTo({
     url: '../address/address',
   })
 }
  
})