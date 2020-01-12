// pages/login/register/register.js
var app=getApp()
const tools = require('../../../utils/tools.js')
Page({
  data:{
    phoneNum:null,
    password:null
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  commit:function(e){
    var that = this
    console.log(e)
    var phone = e.detail.value.phoneNumber
    var pwd = e.detail.value.password
    console.log(phone)
    console.log(pwd)
    wx.login({
      success: function (res) {
        var code = res.code
        console.log("登录code", code)
        //上传注册信息
        tools.request(app.globalData.url + "/register", 'post', {
          'code': code, 'mobile': phone, 'password': pwd, 'position':'用户'})
          .then(resp => {
            console.log(resp.data)
            if(resp.data != false){
              console.log("注册成功");
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 1500,
                success: function () {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '/pages/clean/clean',
                    })
                  }, 1500);
                }
              })
              var userInfo1 = {
                userid: resp.data.userid, ///这边也需要
                nickname: '新用户',
                head_img: '/images/icon/clean.png',
                telephone: phone,
                sex: '男',
                school_name: '',
                building_num: null,
                dormitory_num: null,
                position: '用户',
                xuehao: '',
                xhpassword: null
              }
              app.globalData.userInfo = userInfo1
            } else{
              console.log("注册失败");
              wx.showToast({
                title: '用户已存在',
                icon: 'none',
                duration: 1500
              })
            }
        })   
      }   
    })                                                                                         
  }
})