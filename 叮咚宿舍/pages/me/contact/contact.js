// pages/me/contact/contact.js
const tools = require('../../../utils/tools.js')
var app = getApp()
Page({
  data: {
    
  },
  submit:function(e){
    console.log(e.detail.value.suggest)
    var suggest = e.detail.value.suggest
    var userInfo1 = getApp().globalData.userInfo
    tools.request(app.globalData.url + "/contactUs", 'post', {
      'userid': userInfo1.userid, ///这边也需要
      'content': suggest
    }).then(resp => {
      console.log('更新成功了', resp)
    })
  },
  onLoad: function (options) {

  }
})