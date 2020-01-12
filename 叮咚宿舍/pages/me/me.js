// pages/me/me.js
const utils = require('../../utils/tools.js')
var app = getApp()
Page({ 
  data: {
    userInfo:{},
    userNotificationNum: 0,
    auth: {},
  },
  //联系
  contact:function(e){
    utils.navigateTo(e.currentTarget.dataset.url)
  },
  //跳转
  person:function(e){
    console.log(e.currentTarget.dataset.url)
    utils.navigateTo(e.currentTarget.dataset.url)
  },

  onShow:function(options){
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  onLoad: function (options) {
  
  }
})