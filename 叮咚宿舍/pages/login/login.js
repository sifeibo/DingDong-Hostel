const tools = require('../../utils/tools.js')
var app=getApp()                                                             
Page({
  data: {
    mobile: '',
    password: '',
  },
  zhuce:function(e){
    wx.navigateTo({
      url: '/pages/login/register/register'
    })
  },
  commit:function(e) {
    var that=this
    console.log(e)
    var phone=e.detail.value.phoneNumber
    var pwd=e.detail.value.password
    wx.login({
      success: function (res) {
        var code = res.code
        console.log("登录code", code)
        //上传登录信息
        tools.request(app.globalData.url + "/login", 'post', { 'code': code, 'phone': phone, 'password': pwd })
          .then(resp => {
            // console.log(resp.data)
            if (resp.data == 'False') {
              console.log("登录失败，密码错误");
              wx.showToast({
                title: '密码错误',
                icon: 'none',
                duration: 1500,
              })
            }else{
              wx.showToast({
                title: '登录成功',
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
                userid: resp.data.userid,
                nickname: resp.data.nickname,
                head_img: resp.data.headimg,
                telephone: resp.data.moblie,
                sex: resp.data.sex,
                school_name: resp.data.school,
                building_num: resp.data.dong,
                dormitory_num: resp.data.room,
                position: resp.data.shenfen,
                xuehao: resp.data.xuehao,
                xhpassword: resp.data.xhpassword
              }
              app.globalData.userInfo = userInfo1
              console.log("存入登录信息",userInfo1)
            }
          })
      }
    })                      
  }, 
})