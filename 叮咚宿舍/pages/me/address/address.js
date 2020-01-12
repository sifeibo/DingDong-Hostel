// pages/me/address/address.js
const tools = require('../../../utils/tools.js')
var app = getApp()  
Page({
  data: {
    userInfo:null,
    schoolarray: [],
    donghaoarray: ['1', '2','3','4','5','6','7','8','9','10','11'],
    schoolvalue: 0,
    dongvalue: 0
  },
 
  changeroom:function(e){
    var userInfo1 = getApp().globalData.userInfo
    userInfo1.dormitory_num = e.detail.value
    this.setData({
      userInfo: userInfo1
    })
  },
  //选择器修改
  bindPickerChange: function (e) {
    var userInfo1 = getApp().globalData.userInfo
    userInfo1.school_name = this.data.schoolarray[e.detail.value]
    this.setData({
      userInfo: userInfo1,
      schoolvalue: e.detail.value
    })
  },
  //选择器修改
  bindPickerChange1: function (e) {
    var userInfo1 = getApp().globalData.userInfo
    userInfo1.building_num = this.data.donghaoarray[e.detail.value]
    this.setData({
      userInfo: userInfo1,
      dongvalue: e.detail.value
    })
  },
  onLoad: function (options) {
    //获取全局变量，获取信息
    var userInfo1 = getApp().globalData.userInfo
    var that = this
    tools.request(app.globalData.url + "/login/me/getSchoolName", 'post', {})
      .then(resp=>{
        console.log(resp.data)
        that.setData({
          schoolarray: resp.data
        })
      }).catch(function (reason) {
        console.log('rejected:', reason);
      });
    that.setData({
      userInfo: userInfo1
    })
  },

  //返回时上传信息
   onUnload: function () {
    var userInfo1 = getApp().globalData.userInfo
    console.log("我被卸载了")
    // console.log("全局信息", userInfo1)
    
    tools.request(app.globalData.url + "/login/me/updateUserAddress", 'post', {
      'userid': userInfo1.userid, ///这边也需要
      'schoolName': userInfo1.school_name,
      'building': userInfo1.building_num,
      'room': userInfo1.dormitory_num,
     }).then(resp => {
       console.log('更新成功了', resp)
     })
  }
})