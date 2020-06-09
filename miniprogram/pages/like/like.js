// miniprogram/pages/like/like.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     //我的收藏数据
     likeProductData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getLikeProduct()
  },

  //获取收藏商品
  getLikeProduct() {
    wx.cloud.callFunction({
      name: 'get_like_product',
      success: res => {
        console.log('res', res)
        if (res.result.data.length > 0) {
          //获取所有商品id
          var ids = [];
          res.result.data.forEach(v => {
            ids.push(v.id)
          })

          this.getProductById(ids)
        }
      }
    })
  },

  //根据商品id获取信息
  getProductById(ids){
    wx.cloud.callFunction({
      name:'get_product_byid',
      data:{
        ids:ids
      },
      success:res=>{
        //console.log('res',res)
        this.setData({
          likeProductData:res.result.data
        })
      }
     
    })
  },
  //删除我的收藏
  removeLikeProduct(e){
    wx.cloud.callFunction({
      name:'remove_like_product',
      data:{
        id:e.currentTarget.dataset.id
      },
      success:res=>{
        console.log('res',res)
        //删除页面收藏
        this.data.likeProductData.splice(e.currentTarget.dataset.index,1)
        this.setData({
           likeProductData:this.data.likeProductData
        })
      }  
    })
  }
})