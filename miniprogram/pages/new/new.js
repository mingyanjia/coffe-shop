// miniprogram/pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //定义地址数据
    addressData: {
      user: '',
      sex: [{
          isSelect: true,
          title: '男'
        },
        {
          isSelect: false,
          title: '女'
        }
      ],
      phone: '',
      address: '请输入地址',
      detail: '',
      tag: [{
          isSelect: true,
          title: '公司'
        },
        {
          isSelect: false,
          title: '家'
        },
        {
          isSelect: false,
          title: '学校'
        }
      ],
      //0默认1非默认
      default: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //切换状态
  toggleStatus(e, key) {
    if (e.currentTarget.dataset.select) {
      return;
    }
    for (var i = 0; i < this.data.addressData[key].length; i++) {
      if (this.data.addressData[key][i].isSelect) {
        this.data.addressData[key][i].isSelect = false;
        break;
      }
    }
    this.data.addressData[key][e.currentTarget.dataset.index].isSelect = true
    this.setData({
      addressData: this.data.addressData
    })
  },
  //切换性别
  toggleSex(e) {
    this.toggleStatus(e, 'sex')
  },
  //切换标签
  toggleTag(e) {
    this.toggleStatus(e, 'tag')
  },
  //切换默认地址
  toggleDefault() {
    this.data.addressData.default = this.data.addressData.default == 0 ? 1 : 0
    this.setData({
      addressData: this.data.addressData
    })
  },
  //修改联系人
  modifyUser(e) {
    this.data.addressData.user = e.detail.value
    this.setData({
      addressData: this.data.addressData
    })
  },



  //保存
  save() {
    //保存在数据库中地址数据
    var address = {};

    //验证表单是否为空值
    var data = {
      user: {
        value: '',
        msg: '联系人不能为空'
      },
      phone: {
        value: '',
        msg: '手机号不能为空'
      },
      address: {
        value: '请输入地址',
        msg: '请填写地址'
      },
      detail: {
        value: '',
        msg: '门牌号不能为空'
      }
    }
    for (var key in data) {
      if (this.data.addressData[key] == data[key].value) {
        wx.showToast({
          title: data[key].msg,
          icon: 'none',
          duration: 2000
        })
        return
      }
      address[key] = this.data.addressData[key]
    }
    //获取性别、标签、默认地址
    var k = ['sex', 'tag'];
    k.forEach(v => {

      for (var i = 0; i < this.data.addressData[v].length; i++) {
        if (this.data.addressData[v][i].isSelect) {
          address[v] = this.data.addressData[v][i].title;
          break;
        }
      }
    })
    address.default = this.data.addressData.default;
    console.log('address ==> ', address);
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    })

    //加入数据库
    wx.cloud.callFunction({
      name: 'add_address',
      data: address,
      success: res => {
        console.log('res', res)
      }
    })
  },
  //手机号
  modifyPhone(e) {
    var phoneReg = /^1[3456789]\d{9}$/

    //验证失败
    if (!phoneReg.test(e.detail.value)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 2000
      })
      this.data.addressData.phone = ''
    } else {
      this.data.addressData.phone = e.detail.value
    }
    this.setData({
      addressData: this.data.addressData
    })
  },

  //修改地址
  modifyAddress(e) {
    this.data.addressData.address = e.detail.value.join('')
    this.setData({
      addressData: this.data.addressData
    })
  },
  // 修改门牌号
  modifyDetail(e) {
    this.data.addressData.detail = e.detail.value
    this.setData({
      addressData: this.data.addressData
    })
  }
})