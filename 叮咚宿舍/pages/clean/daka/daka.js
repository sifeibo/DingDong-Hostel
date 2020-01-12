// pages/clean/daka/daka.js
const tools = require('../../../utils/tools.js')
var app = getApp()
// 在页面中定义插屏广告
let interstitialAd = null
Page({
  data: {
    list:[],
    zongji:0
  },

  onLoad: function (options) {
    var that = this
    var userInfo1 = getApp().globalData.userInfo
    if (userInfo1.xuehao != '' && userInfo1.xuehao != 'null'){
      tools.request(app.globalData.url + "/daka/searchPlayCard", 'post', { 'username': userInfo1.xuehao})
        .then(resp => {
          console.log(resp.data);
          var li2 = []
          for(var i in resp.data){
            var li=[]
            li.push(i)
            li.push(resp.data[i])
            li2.push(li)
          }
          console.log(li2)
          var zong = li2[10][1]
          console.log(zong)
          li2.splice(10,1)
          that.setData({
            list:li2,
            zongji:zong
          })
        })
    }else{
      wx.showModal({
        title: '查询失败',
        content: '请先填写学号,教务密码等信息',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function (res) {
          wx.redirectTo({
            url: '/pages/me/person/person'
          })
        }
      })
    }
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({ adUnitId: 'adunit-6b00edff5d7505f7' })
      interstitialAd.onLoad(() => {
        console.log('onLoad event emit')
      })
      interstitialAd.onError((err) => {
        console.log('onError event emit', err)
      })
      interstitialAd.onClose((res) => {
        console.log('onClose event emit', res)
      })
    }
  },

  onReady: function(e){
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  }
})