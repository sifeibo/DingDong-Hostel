// pages/clean/clean-detail/clean-detail.js
var app = getApp()
Page({
  data: {
    userInfo:null,
    hideShopPopup: true,
    fuwuarray: [{ name: '清扫地面', active: '', price: 5 }, { name: '清扫厕所', active: '', price: 10 }, { name: '整理桌面', active: '', price: 5 }],
    timearray: ['12:00-15:00', '15:30-17:00','18:00-19:00'],
    timevalue: 0,
    time:null,
    totalprice:0,
    fuwu:null
  },
  address:function(){
    wx.navigateTo({
      url: '/pages/me/address/address',
    })
  },
  time:function(e){
    this.setData({
      time: this.data.timearray[e.detail.value],
      timevalue: e.detail.value
    })
  },
  buynow:function(e){
    var warn = "";
    var huwu = "";
    if (this.data.totalprice === 0) {
      wx.showModal({
        title: '提示',
        content: "请选择至少一种服务！"
      })
    }else if (this.data.time==null){
      wx.showModal({
        title: '提示',
        content: "请选择服务时间！"
      })
    }else if (this.data.userInfo.room == null) {
      wx.showModal({
        title: '提示',
        content: "请填写所在房间！"
      })
    }else if (this.data.userInfo.school == null) {
      wx.showModal({
        title: '提示',
        content: "请选择学校地址！"
      })
    }else if (this.data.userInfo.dong == null) {
      wx.showModal({
        title: '提示',
        content: "请选择所在栋！"
      })
    }else {
      for (var i = 0; i < this.data.fuwuarray.length;i++){
        if (this.data.fuwuarray[i].active === 'active'){
          huwu += this.data.fuwuarray[i].name
        }
      }
      console.log("需要的服务：",huwu)
    
    //   uplist = {
    //     "": this.data.userInfo.school,
    //     "": this.data.userInfo.dong,
    //     "": this.data.userInfo.room,
    //     "": this.data.userInfo.time,
    //     "": this.data.totalprice
    //   }
    //   wx.request({
    //     url: app.data.url + '/shopping/insertRecord',
    //     method: "POST",
    //     header: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     data: uplist[i],
    //     success: function () {
    //     console.log("好了")
    //     }
    //   })
    //   console.log(uplist)
    }
  },
  /**
   * 类型选择弹出框
   */
  bindGuiGeTap: function () {
    this.setData({
      hideShopPopup: false
    })
  },
  //关闭弹出框
  closePopupTap: function () {
    this.setData({
      hideShopPopup: true
    })
  },
  labelItemTap: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset)
    var fuwuarray1 = this.data.fuwuarray
    var totalprice = this.data.totalprice
    if (fuwuarray1[e.currentTarget.dataset.index].active === 'active'){
      fuwuarray1[e.currentTarget.dataset.index].active = ''
      totalprice -= fuwuarray1[e.currentTarget.dataset.index].price
      that.setData({
        fuwuarray:fuwuarray1,
        totalprice: totalprice
      })
    }else{
      fuwuarray1[e.currentTarget.dataset.index].active = 'active'
      totalprice += fuwuarray1[e.currentTarget.dataset.index].price
      that.setData({
        fuwuarray: fuwuarray1,
        totalprice: totalprice
      })
    }
  },
  onLoad: function (options) {

  },

  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }
})