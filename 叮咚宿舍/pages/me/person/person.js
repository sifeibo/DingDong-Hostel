// pages/me/person/person.js
var app = getApp()
const tools = require("../../../utils/tools.js")
Page({
  data: {
    userInfo:null,
    array:['男','女'],
    sexvalue:0
  },

  //选择图片
  chooseImage: function () {
    var that = this
    //选择照片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        var userInfo1 = getApp().globalData.userInfo
        userInfo1.head_img = tempFilePaths
        that.setData({
          userInfo: userInfo1
        })
      }
    })
  },
 //电话改变
  changephone:function(e) {
    var userInfo1 = getApp().globalData.userInfo
    userInfo1.telephone = e.detail.value
    this.setData({
      userInfo: userInfo1
    })
  },
  //学号改变
  changexuehao:function(e){
    var userInfo1 = getApp().globalData.userInfo
    userInfo1.xuehao = e.detail.value
    this.setData({
      userInfo:userInfo1
    })
  },
  //教务密码修改
  changexhpassword: function (e) {
    var userInfo1 = getApp().globalData.userInfo
    userInfo1.xhpassword = e.detail.value
    this.setData({
      userInfo: userInfo1
    })
  },
  //名字改变
  changename:function(e){
    var userInfo1 = getApp().globalData.userInfo
    userInfo1.nickname = e.detail.value
    this.setData({
       userInfo: userInfo1
    })
  },
  //选择器修改
  bindPickerChange:function(e){
    var userInfo1 = getApp().globalData.userInfo
    userInfo1.sex = this.data.array[e.detail.value]
    this.setData({
      userInfo: userInfo1,
      sexvalue: e.detail.value
    })
  },
  onLoad: function (options) {
    //获取全局变量，获取信息
    var userInfo1 = getApp().globalData.userInfo
    this.setData({
      userInfo: userInfo1
    })
  },
  /**
 * 生命周期函数--监听页面卸载
 */
  onUnload: function () {
    var userInfo1 = getApp().globalData.userInfo
    console.log("我被卸载了")
    //这时候向服务器提交数据
    //提交名字和号码成功之后提交图片
    // console.log('个人信息',userInfo1)
    tools.request(app.globalData.url + "/login/me/updateUserInfo", 'post', { 
      'userid': userInfo1.userid, ///这边也需要
      'nickname': userInfo1.nickname,
      'mobile': userInfo1.telephone,
      'sex': userInfo1.sex,
      'xuehao': userInfo1.xuehao,
      'stupwd': userInfo1.xhpassword
    }).then(resp => {
      console.log('更新成功没',resp)
          wx.showToast({
            title: '修改成功',
          })
    
    })
  },
})