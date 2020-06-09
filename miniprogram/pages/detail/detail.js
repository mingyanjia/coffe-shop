// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //保存商品详情数据
    detailData: {},
    isLike: false,
    //规格信息
    //ruleData:{},
    count:1,
    idx:'',
    idxx:'',
    applyList: [
        { Item_id: "0", Item_Name: "热" },
        { Item_id: "1", Item_Name: "冷" }
       ],
    apply:[
      { Item_iid: "0", Item_Name: "轻度" },
      { Item_iid: "1", Item_Name: "中度" },
      { Item_iid: "2", Item_Name: "高度" }
      
    ]
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id
    //console.log('id',id)
    this.getProductDetail(id)
  },

  //获取商品详情数据
  getProductDetail(id) {
    wx.showLoading({
      title: '加载中...',
    })

    //调用晕函数
    wx.cloud.callFunction({
      name: 'get_detail',
      data: {
        id: id
      },
      success: res => {
        wx.hideLoading();
        var desc = res.result.data[0].desc;

        res.result.data[0].desc = desc.split(/\n/);
        this.setData({
          detailData: res.result.data[0]
        })

        //console.log(this.data.detailData)
        //获取收藏商品
        this.getLikeProduct(id);
        //获取商品规格
        this.getRule(id);
      },
      fail: err => {
        console.log('err', err)
      }
    })
  },
  //收藏,取消商品
  likeProduct(e) {

    if (!this.data.isLike) {
      wx.cloud.callFunction({
        name: 'like_product',
        data: {
          id: e.currentTarget.dataset.id
        },
        success: res => {
          //console.log('res',res)
          this.setData({
            isLike: true
          })
        },
        fail: err => {
          console.log('err', err)
        }
      })
    } else {
      //取消
      wx.cloud.callFunction({
        name:'remove_like_product',
        data:{
          id:e.currentTarget.dataset.id
        },
        success: res => {
          //console.log('res',res)
          this.setData({
            isLike:false
          })
        },
        fail: err => {
          console.log('err', err)
        }
      })
    }
  },
  //获取收藏商品
  getLikeProduct(id){
   wx.cloud.callFunction({
     name:'get_like_product',
     data:{
      id:id
     },
     success:res=>{
       // console.log('res',res)
        //如果存在数据表明收藏过
        this.setData({
            isLike:res.result.data.length>0
        })
      
     },
     fail:err=>{
       console.log('err',err)
     }
   })
  },

  //获取商品规格数据
  getRule: function (id) {
   
    wx.cloud.callFunction({
      name: 'get_rule',
      data: {
        id: id
      },
      success: res => {
       // console.log('商品规格数据 res ==> ', res);
      },

      fail: err => {
        console.log('出错了 err ==> ', err);
      }
    })
  },
  //改变温度
  cli(e){
    let id = e.target.dataset.id
    this.setData({
      idx: id
    })
  },
  //改变糖量
  cli1(e) {
    let id = e.target.dataset.id
    this.setData({
      idxx: id
    })
  },
 
  //增加商品数量
  add(){
   this.setData({
     count:++this.data.count
   })
  },
  reduce(){
    if (this.data.count == 1) {
        return;
    }else{
      this.setData({
        count:--this.data.count
      })
    } 
  },

  //加入购物车
  addShopcart(key){
    //商品id
    //商品规格
    //商品数量
    var x = ['冷/中度', '热/高度', '冷/轻度', '冷/高度', '热/中度', '热/轻度',];
   var ru= x[Math.floor(Math.random() * x.length)];
    var product={
      id:this.data.detailData._id,
      count:this.data.count,
      rules: ru
    }

    wx.showLoading({
      title: '正在加载...'
    })

    //console.log('product',product)
    //购物车是否存在当前商品
    wx.cloud.callFunction({
      name:'get_shopcart',
      data:{
        id:this.data.detailData._id,
        rules:ru
      },
      success:res=>{
        //console.log('res',res)
        //不存在商品

        wx.hideLoading()
        if(res.result.data.length==0){
           this.addProduct(product,key)
        }else{
         //修改数量
         var id=res.result.data[0]._id
         var count=res.result.data[0].count+this.data.count
        this.updateProductCount(product,count,key,id)
        }
      }
    })
  },

  //添加新的商品到购物车
  addProduct(product,key){
    wx.cloud.callFunction({
      name: 'add_shopcart',
      data: product,
      success: res => {
       // console.log('res', res)

       //立即购买 跳转提交页面
       if(key==1){
       
         wx.navigateTo({
           url: '../commit/commit?id='+res.result._id,
         })
       }
      },
      fail: err => {
        console.log('err', err)
      }
    })
  },

  //修改购物车商品数量
  updateProductCount(product,count,key,id){
    wx.cloud.callFunction({
      name:'update_shopcart',
      data:{
        id:product.id,
        rules:product.rules,
        count:count
      },
      success:res=>{
        console.log('res',res)

        if (key == 1) {
          wx.navigateTo({
            url: '../commit/commit?id='+id,
          })
        }
      }
    })
  },

  //立即购买
  buy(e){
   
    var key=e.currentTarget.dataset.key
    this.addShopcart(key)
  }
})