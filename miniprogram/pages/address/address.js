// miniprogram/pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //收获地址数据
      addressData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getAddress()
  },
  
  //新增地址跳转
  newaddTurn(){
    wx.navigateTo({
      url: '../new/new', 
    })
  },
  //获取收获地址
  getAddress(){
    wx.cloud.callFunction({
      name:'get_address',
      success:res=>{
        console.log('res==',res)
        this.setData({
          addressData:res.result.data
        })
      }
    })
  }
})