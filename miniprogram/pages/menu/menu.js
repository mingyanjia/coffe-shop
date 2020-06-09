// miniprogram/pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerData: [{
        imgUrl: 'cloud://shopping-qjbx6.7368-shopping-qjbx6-1301541086/banner/bga1.jpg'
      },
      {
        imgUrl: 'cloud://shopping-qjbx6.7368-shopping-qjbx6-1301541086/banner/bga2.jpg'
      },
      {
        imgUrl: 'cloud://shopping-qjbx6.7368-shopping-qjbx6-1301541086/banner/bga3.jpg'
      },
      {
        imgUrl: 'cloud://shopping-qjbx6.7368-shopping-qjbx6-1301541086/banner/bga4.jpg'
      }
    ],

    //侧边栏数据
    asideData: [{
        title: '最新推荐',
        isActive: true,
        key: 'is_hot',
        value: 1
      },
      {
        title: '大师咖啡',
        isActive: false,
        key: 'type',
        value: 'coffee'
      },
      {
        title: '拿铁',
        isActive: false,
        key: 'type',
        value: 'latte'
      },
      {
        title: '瑞纳冰',
        isActive: false,
        key: 'type',
        value: 'rena_ice'
      }
    ],
    //商品数据
    productData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取商品数据
    this.getProduct('is_hot', 1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //切换左侧菜单
  leftChange(e) {
    if (e.currentTarget.dataset.active) {
      return
    }

    for (var i = 0; i < this.data.asideData.length; i++) {
      if (this.data.asideData[i].isActive) {
        this.data.asideData[i].isActive = false
        break
      }
    }
    this.data.asideData[e.currentTarget.dataset.index].isActive = true
    //响应页面数据
    this.setData({
      asideData: this.data.asideData
    })
    //获取商品数据
    this.getProduct(e.currentTarget.dataset.key, e.currentTarget.dataset.value)
  },

  //获取商品数据
  getProduct(key, value) {

    //加载提示
    wx.showLoading({
      title: '加载中...',
    })

    //调用云函数【get_product】获取商品
    wx.cloud.callFunction({
      name: 'get_product',
      //参数
      data: {
        key: key,
        value: value
      },

      success: res => {
        //关闭加载
        wx.hideLoading()
        //console.log('res ==> ', res);
        this.setData({
          productData: res.result.data
        })
      },

      fail: err => {
        wx.hideLoading()
       // console.log('出错了 err ==> ', err);
      }
    })
  },
  

  //获取商品详情
  goDetail(e){
    var id=e.currentTarget.dataset.id
     
     wx.navigateTo({
       url: '../detail/detail?id=' + id,
     })
  }

})