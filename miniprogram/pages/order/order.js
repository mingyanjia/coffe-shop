// miniprogram/pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     //订单数据
     orderData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getOrderData()
  },

  //获取订单数据
  getOrderData(){
    wx.cloud.callFunction({
      name:'get_order',
      success:res=>{
       // console.log('res',res)
        res.result.data.forEach(v => {
          v.count = 0;
          v.total = 0;
          v.products.forEach(item => {
            v.count += item.count;
            v.total += item.count * item.price
          })
        })
       this.setData({
         orderData:res.result.data
       })

     
      },
   
    })
  }
})