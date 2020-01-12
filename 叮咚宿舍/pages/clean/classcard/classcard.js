// pages/clean/classcard/classcard.js
const tools = require("../../../utils/tools.js")
var app = getApp()
let interstitialAd = null
Page({
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: []
  },
  onLoad: function (options) {
    var that = this;
    var userInfo1 = getApp().globalData.userInfo
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-6b00edff5d7505f7'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }
    if (userInfo1.xuehao != '' && userInfo1.xhpassword != null) {
      tools.request(app.globalData.url + "/courseTable/searchCourseTable", 'post', { 'username': userInfo1.xuehao, 'password': userInfo1.xhpassword})
      .then(resp => {
        console.log(resp.data)
        var a = resp.data;
        var list = [];
        var w = 0;
        /* 遍历所有的课程数据 */
        for (var index in a) {
          w++;
          // console.log(index);
          // console.log(a[index]);
          for (var i = 0; i < a[index].length; i++) {
            var num1 = a[index][i][0].slice(a[index][i][0].length - 2, a[index][i][0].length - 1)
            var address = a[index][i][1].substr(3, 6)
            list.push({
              week: w,
              num: num1 / 2,
              class1: a[index][i][3] + ' ' + a[index][i][2] + ' ' + address,
              class2: ''
            })
          }
        }
        /*合并相同时间的课程*/
        for (var x = 0; x < list.length; x++) {
          for (var y = x + 1; y < list.length; y++) {
            if (list[x].week == list[y].week && list[x].num == list[y].num) {
              list[x].class2 = list[y].class1;
              list.splice(y, 1);
              y--;
            }
          }
        }
 
        that.setData({
          wlist:list
        })
        console.log(list)
      })
    }
    else{
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
  },
  onReady: function(e){
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  }
})