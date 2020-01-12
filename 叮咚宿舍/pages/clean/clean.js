// pages/clean/clean.js
const utils = require('../../utils/tools.js')
var app = getApp()
let videoAd = null
Page({
  data: {
    list:["服务","课程","扣分"],
    imgUrls: [
      '/images/lunbo/1.jpg',
      '/images/lunbo/2.jpg',
      '/images/lunbo/3.jpg'
    ],
    text: "注意：请先在个人信息中填写正确教务的信息!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    buttonList:[ 

    { img: "/images/icon/class.png", name: '课程表'},
    { img: "/images/icon/daka.png", name: '打卡' }, 
    { img: "/images/icon/paihang.png", name: '排行榜' },
    // { img: "/images/icon/xin.png", name: '母亲节' },
    { img: "/images/icon/cloud.png", name: '叮咚云' },
    // { img:"/images/icon/clean-select.png",name:'清洁'},
    { img: "/images/icon/more.png", name: '更多' },
    ],
    cardList:[
      { img: "/images/icon/daka.png", name: '打卡查询',leibie: '打卡', title: '狠清楚' },
      { img: "/images/icon/book.png", name: '旧书服务', leibie: '旧书', title: '旧书站' },
      { img: "/images/icon/class.png", name: '课程表', leibie: '课程', title: '上课不迟到'},
      { img: "/images/icon/printer.png", name: '打印服务', leibie: '打印', title: '打印狠方便' },],
  },
  /* 按钮点击事件 */
  clickcard: function (e) {
    console.log(e.currentTarget.dataset.index)
    var a = e.currentTarget.dataset.index
    if (a === 0) {
      utils.navigateTo('/pages/clean/daka/daka')
    } else if (a === 1) {
      utils.navigateTo('/pages/index/index')
    }
    else if (a === 2) {
      utils.navigateTo('/pages/clean/classcard/classcard')
    }
    else {
      utils.navigateTo('/pages/index/index')
    }
  },
  /* 按钮点击事件 */
  clickbutton:function(e){
    // console.log(e.currentTarget.dataset.index)
    var a = e.currentTarget.dataset.index
    if(a === 0){
      utils.navigateTo('/pages/clean/classcard/classcard')
    } else if (a === 1){
      utils.navigateTo('/pages/clean/daka/daka')
    }
    else if (a === 2) {
      utils.navigateTo('/pages/paihang/paihang')
    }
    // else if (a === 3) {
    //   utils.navigateTo('/pages/clean/vote/vote')
    // } 
    else if (a === 3) {
      utils.request(app.globalData.url + "/ddcLogin", 'post', { 'user_id': app.globalData.userInfo.userid })
        .then(resp => {
          console.log(resp);
          app.globalData.cookie = resp.header["Set-Cookie"]
          if (resp.data.msg === '登录成功') {
            utils.navigateTo('/pages/yunpan/yunpan')
          } else {
            wx.showToast({
              title: '密码错误,请核对学号和教务密码!',
              icon: 'none'
            })
          }
        })
    } 
    else if (a === 4) {
      utils.navigateTo('/pages/index/index')
    } 
  },
  onSearch:function(e){
    console.log(e.detail)
  },
  onLoad: function (options) {
    var vm = this;
    //获取消息
    utils.request(app.globalData.url + "/getNotice", 'post', {})
      .then(resp => {
        console.log(resp)
        vm.setData({
          text: resp.data[0].content
        })
      })
    //启动小程序时候向服务器发送信息获取用户信息
    wx.login({
      success: function (res) {
        var code = res.code
        console.log("登录code", code)
        //上传登录信息
        utils.request(app.globalData.url + "/wxlogin", 'post', { 'code': code })
          .then(resp => {
            console.log('服务器返回登录相关信息',resp.data)
            var userInfo1 = {
              userid: resp.data.user_id, ///这边也需要
              nickname: resp.data.nickname,
              head_img: resp.data.headimg,
              telephone: resp.data.moblie,
              sex: resp.data.sex,
              school_name: resp.data.school,
              building_num: resp.data.dong,
              dormitory_num: resp.data.room,
              xuehao: resp.data.xuehao,
              xhpassword: resp.data.xhpassword
            }
            app.globalData.userInfo = userInfo1
            console.log("存入登录信息", userInfo1)
          })
      }
    })


    // 单机测试
    // var userInfo1 = {
    //   userid: 1, ///这边也需要
    //   nickname: '肥波',
    //   head_img: '',
    //   telephone: 17312556080,
    //   sex: '男',
    //   school_name: '常熟理工学院',
    //   building_num: '10',
    //   dormitory_num: '315',
    //   position: '用户',
    //   xuehao: '092716201',
    //   xhpassword: 'Chb520++'
    // }
    // app.globalData.userInfo = userInfo1
    // console.log("存入登录信息", userInfo1)
  }

})